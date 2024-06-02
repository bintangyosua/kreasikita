"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { getUser } from "./api/users";

export type SessionType = {
  access_token: string;
  isSignedIn: boolean;
  id: number;
  email: string;
  username: string;
  name: string;
  order_id: string;
  creator_username: string;
};

export type PaymentSessionType = {
  order_id: string;
  creator_username: string;
  name: string;
  email: string;
};

export async function setSession(access_token: string) {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  const user = await getUser(access_token);

  session.access_token = access_token;
  session.isSignedIn = true;

  session.email = user.email;
  session.id = user.sub;
  session.username = user.username;
  session.name = user.name;

  await session.save();
}

export async function getSession(): Promise<
  Omit<SessionType, "order_id" | "creator_username">
> {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  if (!session) {
    throw new Error("Session not found");
  }

  return {
    name: session.name || "",
    username: session.username || "",
    email: session.email || "",
    id: session.id || 0,
    access_token: session.access_token || "",
    isSignedIn: session.isSignedIn || false,
  };
}

export async function deleteSession() {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  session.destroy();
}

export async function createSessionPayment(
  order_id: string,
  creator_username: string,
  name: string,
  email: string
) {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  session.order_id = order_id;
  session.creator_username = creator_username;
  session.name = name;
  session.email = email;

  await session.save();
}

export async function getSessionPayment(): Promise<PaymentSessionType> {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  return {
    order_id: session.order_id,
    creator_username: session.creator_username,
    name: session.name,
    email: session.email,
  };
}