"use server";

import { TDonation } from "@/types/types";
import { getSession, SessionType } from "../session";
import { getProfile } from "./users";
import { fetchAuthorized, fetchUnAuthorized } from "./wrapper";

export async function getAllDonations(access_token: string) {
  const res = await fetchAuthorized(
    `${process.env.API_URL}/donations`,
    "GET",
    access_token
  );

  return await res;
}

export async function createDonation(data: any, session: SessionType) {
  const profile = session.access_token
    ? await getProfile(session.access_token)
    : null;
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
        transaction_time: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    // const json = await res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getDonationsByProfile(
  username: string
): Promise<TDonation[]> {
  const res = await fetchUnAuthorized(
    `${process.env.API_URL}/donations/profile/${username}`,
    "GET"
  );

  return res.data;
}

export async function getDonationsByReceiver() {
  const session = await getSession();
  const res = await fetch(`${process.env.API_URL}/donations/receiver`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    cache: "no-store",
  });

  const json = await res.json();

  json.data.forEach((value: any, key: number) => {
    value.pfp = `${process.env.API_URL}/public/${value.sender.pfp}`;
  });

  console.log({ json });

  return json;
}

export async function getDonationsBySenderUsername() {
  const session = await getSession();

  const res = await fetch(`${process.env.API_URL}/donations/groupby/sender`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}
