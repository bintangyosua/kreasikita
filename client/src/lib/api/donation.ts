"use server";

import { getSession, SessionType } from "../session";
import { getProfile } from "./users";

export async function createDonation(data: any, session: SessionType) {
  const profile = await getProfile(session.access_token);
  try {
    const res = await fetch(`${process.env.API_URL}/payment/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: data.order_id,
        gross_amount: data.gross_amount,
        senderUsername: profile?.username || "anonymous",
        receiverUsername: data.receiverUsername,
        message: data.message,
        senderEmail: data.email,
        senderName: data.name,
        transaction_status: "pending",
        settlement_time: new Date().toISOString(),
      }),
    });

    // const json = await res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getDonationsByReceiver() {
  const session = await getSession();
  const res = await fetch(`${process.env.API_URL}/donations/receiver`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  return await res.json();
}

export async function getDonationsBySenderUsername() {
  const session = await getSession();

  const res = await fetch(`${process.env.API_URL}/donations/groupby/sender`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  return await res.json();
}
