import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/createpayment.dto';

@Controller('payment')
export class PaymentController {
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
