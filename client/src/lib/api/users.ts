"use server";

import { TProfile } from "@/types/profile";
import { deleteSession, getSession, setSession } from "../session";
import { fetchAuthorized } from "./wrapper";

export async function postUser(
  user: any,
  categoryId: number | string | undefined
) {
  const res = await fetch(`${process.env.API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user,
      categoryId,
    }),
  });

  return res.json();
}

export async function getUser(access_token: string) {
  const res = await fetch(`${process.env.API_URL}/auth/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return await res.json();
}

export async function getProfile(access_token: string): Promise<TProfile> {
  const res = await fetch(`${process.env.API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  let data = await res.json();

  data.data.pfp = `${process.env.API_URL}/public/${data.data.pfp}`;

  return data.data;
}

export async function getUserByUsername(username: string) {
  const res = await fetch(`${process.env.API_URL}/users?username=${username}`);
  return await res.json();
}

export async function updateUserByUsername({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const session = await getSession();
  const profile = await getProfile(session.access_token);
  const res = await fetch(`${process.env.API_URL}/users/${profile.username}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  await setSession(session.access_token);

  return await res.json();
}

export async function getUsersByCategoryName(name: string) {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const res = await fetch(`${process.env.API_URL}/users/category/${name}`, {});
  return await res.json();
}

export async function validateAdmin(access_token: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/validate-admin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadAvatarServer(
  formData: FormData,
  access_token: string
) {
  const user = await getProfile(access_token);
  const res = await fetch(`${process.env.API_URL}/users/${user.username}/pfp`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${access_token}`,
    },
    body: formData,
  });

  return {
    status: 200,
  };
}
