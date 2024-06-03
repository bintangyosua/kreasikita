import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/createpayment.dto';
import { Response } from 'src/types/response.type';
import { NotificationPaymentDto } from './dto/notificationayment.dto';
import { DonationService } from 'src/donation/donation.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly donationService: DonationService) {}

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
          sender: {
            connect: {
              username: notificationPaymentDto.senderUsername,
            },
          },
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
