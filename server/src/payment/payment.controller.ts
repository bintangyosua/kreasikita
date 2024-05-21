import { Body, Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';
import crypto from 'crypto';
import { createSign, createHash, createHmac } from 'node:crypto';

@Controller('payment')
export class PaymentController {
  @Post('invoice')
  async createInvoice(
    @Body() body: { order_id: string; gross_amount: number },
  ) {
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

  @Get('doku')
  async createDokuInvoice() {
    // Generate Digest
    function generateDigest(jsonBody) {
      let jsonStringHash256 = createHash('sha256')
        .update(jsonBody, 'utf-8')
        .digest();

      let bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
      return bufferFromJsonStringHash256.toString('base64');
    }

    function generateSignature(
      clientId,
      requestId,
      requestTimestamp,
      requestTarget,
      digest,
      secret,
    ) {
      // Prepare Signature Component
      console.log('----- Component Signature -----');
      let componentSignature = 'Client-Id:' + clientId;
      componentSignature += '\n';
      componentSignature += 'Request-Id:' + requestId;
      componentSignature += '\n';
      componentSignature += 'Request-Timestamp:' + requestTimestamp;
      componentSignature += '\n';
      componentSignature += 'Request-Target:' + requestTarget;
      // If body not send when access API with HTTP method GET/DELETE
      if (digest) {
        componentSignature += '\n';
        componentSignature += 'Digest:' + digest;
      }

      console.log(componentSignature.toString());
      console.log();

      // Calculate HMAC-SHA256 base64 from all the components above
      let hmac256Value = createHmac('sha256', secret)
        .update(componentSignature.toString())
        .digest();

      let bufferFromHmac256Value = Buffer.from(hmac256Value);
      let signature = bufferFromHmac256Value.toString('base64');
      // Prepend encoded result with algorithm info HMACSHA256=
      return 'HMACSHA256=' + signature;
    }

    // Sample of Usage

    // Generate Digest from JSON Body, For HTTP Method GET/DELETE don't need generate Digest
    console.log('----- Digest -----');
    let jsonBody =
      '{"order":{"invoice_number":"INV-20210124-0001","amount":150000},"virtual_account_info":{"expired_time":60,"reusable_status":false,"info1":"Merchant Demo Store"},"customer":{"name":"Taufik Ismail","email":"taufik@example.com"}}';
    let digest = generateDigest(jsonBody);
    console.log(digest);
    console.log();

    const now = new Date();
    // now.setTime(now.getTime() + 7 * 60 * 60 * 1000);

    const targetURL = 'https://api-sandbox.doku.com/checkout/v1/payment';

    // Generate Header Signature
    let headerSignature = generateSignature(
      process.env.DOKU_CLIENT_ID,
      process.env.DOKU_REQUEST_ID,
      now,
      targetURL,
      digest,
      process.env.DOKU_SECRET_KEY,
    );
    console.log(headerSignature);

    const res = await fetch(
      'https://api-sandbox.doku.com/checkout/v1/payment',
      {
        method: 'POST',
        headers: {
          'Client-Id': process.env.DOKU_CLIENT_ID,
          'Request-Id': process.env.DOKU_REQUEST_ID,
          'Request-Timestamp': `${now.toISOString()}`,
          Signature: headerSignature,
        },
        body: JSON.stringify({
          order: {
            amount: 20000,
            invoice_number: 'INV-20210231-0001',
          },
          payment: {
            payment_due_date: 60,
          },
        }),
      },
    );

    const data = await res.json();
    return { data };
  }

  @Get('duitku')
  async createDuitkuInvoice() {
    const now = new Date();
    now.setTime(now.getTime() + 7 * 60 * 60 * 1000);

    const secret = `${process.env.DUITKU_MERCHANT_ID} - ${now} - ${process.env.DUITKU_API_SECRET}`;
    const sign = createSign('SHA256');
    sign.write(secret);
    sign.end();
    const signature = sign.sign('a');

    // const res = await fetch(process.env.DUITKU_SANDBOX_URL, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'x-duitku-signature':
    //       'FORMAT SHA256(<MERCHANT_CODE_ANDA> - <TIMESTAMP_JAKARTA> - <API_KEY_ANDA>)',
    //     'x-duitku-timestamp': '<TIMESTAMP_JAKARTA>(Milliseconds)',
    //     'x-duitku-merchantcode': '<YOUR_MERCHANT_CODE_HERE>',
    //   },
    //   body: JSON.stringify({}),
    // });
  }
}
