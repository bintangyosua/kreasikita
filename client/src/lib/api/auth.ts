"use server";

import { getSession } from "../session";

export async function signIn(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function changePassword(password: string) {
  const session = await getSession();
  try {
    const res = await fetch(`${process.env.API_URL}/auth/change-password`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function validate(access_token: string) {
  const res = await fetch(`${process.env.API_URL}/auth/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  return res.json();
}
