import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/createpayment.dto';
import { Response } from 'src/types/response.type';
import { NotificationPaymentDto } from './dto/notificationpayment.dto';
import { DonationService } from 'src/donation/donation.service';
import { UsersService } from 'src/users/users.service';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly donationService: DonationService,
    private readonly usersService: UsersService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post('notification')
  async createDonation(
    @Body() notificationPaymentDto: NotificationPaymentDto,
  ): Promise<Response> {
    if (notificationPaymentDto.transaction_status === 'expire') {
      return {
        status: HttpStatus.OK,
        message: 'Donation deleted',
        data: this.donationService.delete(notificationPaymentDto.order_id),
      };
    }

    if (notificationPaymentDto.transaction_status === 'settlement') {
      const receiverUsername = notificationPaymentDto.order_id.split('-')[0];
      const balance = await this.paymentService.getBalance(receiverUsername);

      await this.paymentService.updateBalance(
        receiverUsername,
        balance.balance + parseInt(notificationPaymentDto.gross_amount),
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'Notification received',
      data: this.donationService.notification(
        {
          transaction_status: notificationPaymentDto.transaction_status,
          transaction_time:
            notificationPaymentDto.settlement_time ||
            notificationPaymentDto.transaction_time,
          payment_type: notificationPaymentDto.payment_type,
        },
        {
          order_id: notificationPaymentDto.order_id,
          gross_amount: parseInt(notificationPaymentDto.gross_amount),
          message: notificationPaymentDto.message,
          senderEmail: notificationPaymentDto.senderEmail,
          senderName: notificationPaymentDto.senderName,
          senderUsername: notificationPaymentDto.senderUsername,
          receiver: {
            connect: {
              username: notificationPaymentDto.receiverUsername,
            },
          },
        },
      ),
    };
  }

  @Get('status/:order_id')
  async getPaymentStatus(@Param('order_id') order_id: string) {
    const hashedMidtransServerKey = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`);

    const res = await fetch(
      `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
      {
        headers: {
          Authorization: `Basic ${hashedMidtransServerKey}`,
        },
      },
    );

    return {
      data: await res.json(),
    };
  }

  @Post('invoice')
  async createInvoice(@Body() body: CreatePaymentDto) {
    const hashedMidtransServerKey = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`);

    if (!body.email) {
      const res = await fetch(process.env.MIDTRANS_SANDBOX_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${hashedMidtransServerKey}`,
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: body.order_id,
            gross_amount: body.gross_amount,
          },
          customer_details: {
            first_name: body.name,
          },
          item_details: [body.item_details],
        }),
      });

      const data = await res.json();
      return { data };
    }

    const res = await fetch(process.env.MIDTRANS_SANDBOX_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${hashedMidtransServerKey}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: body.order_id,
          gross_amount: body.gross_amount,
        },
        customer_details: {
          first_name: body.name,
          email: body.email,
        },
        item_details: [body.item_details],
      }),
    });

    const data = await res.json();
    return { data };
  }
}
