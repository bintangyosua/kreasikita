"use server";

import { SessionType } from "../session";

export async function createDonation(data: any, session: SessionType) {
  try {
    console.log({ session, data });
    const res = await fetch(`${process.env.API_URL}/payment/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: data.order_id,
        gross_amount: data.gross_amount,
        senderUsername: session.username || "anonymous",
        receiverUsername: data.receiverUsername,
        message: data.message,
        senderEmail: data.email,
        senderName: data.name,
        transaction_status: "pending",
        settlement_time: new Date().toISOString(),
      }),
    });

    const json = await res.json();

    console.log({ json });
  } catch (error) {
    console.error(error);
  }
}
