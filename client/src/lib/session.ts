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
  session.id = user!.id;
  session.username = user.username;
  session.name = user.name;

  await session.save();
}

export async function getSession() {
  const session = getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  const data: SessionType = {
    id: (await session).id,
    email: (await session).email,
    access_token: (await session).access_token,
    name: (await session).name,
    username: (await session).username,
    isSignedIn: (await session).isSignedIn,
  };

  return data;
}

export async function deleteSession() {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  session.destroy();
}
