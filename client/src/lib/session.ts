"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { getProfile, getUser } from "./api/users";
import { signIn } from "./api/auth";
import { redirect } from "next/navigation";

export type SessionType = {
  access_token: string;
  isSignedIn: boolean;
  order_id: string;
  creator_username: string;
};

export type PaymentSessionType = {
  order_id: string;
};

export async function setSession(access_token: string) {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  let user = await getProfile(access_token);

  session.access_token = access_token;
  session.isSignedIn = true;

  await session.save();
}

export async function getSession() {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  if (!session) {
    throw new Error("Session not found");
  }

  return {
    access_token: session.access_token,
    isSignedIn: session.isSignedIn || false,
    order_id: "",
    creator_username: "",
  };
}

export async function deleteValidationSession() {
  redirect("/api/auth/signout");
}

export async function deleteSession() {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });
  session.destroy();
}

export async function createSessionPayment(order_id: string) {
  const session = await getIronSession<PaymentSessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita_payment",
  });

  session.order_id = order_id;

  await session.save();
}

export async function getSessionPayment(): Promise<PaymentSessionType> {
  const session = await getIronSession<PaymentSessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita_payment",
  });

  return {
    order_id: session.order_id,
  };
}
