import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/createpayment.dto';

@Controller('payment')
export class PaymentController {
  @Post('invoice')
  async createInvoice(@Body() body: CreatePaymentDto) {
    const hashedMidtransServerKey = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`);

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
      }),
    });

    const data = await res.json();
    return { data };
  }
}
