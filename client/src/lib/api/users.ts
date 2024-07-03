"use server";

import { TProfile } from "@/types/profile";
import { deleteSession, getSession, setSession } from "../session";
import { fetchAuthorized, fetchUnAuthorized } from "./wrapper";

export async function searchUsers(keywords: string) {
  const res = await fetchUnAuthorized(
    `${process.env.API_URL}/users/search/${keywords}`,
    "GET"
  );

  return res;
}

export async function getUsers() {
  const res = await fetchUnAuthorized(`${process.env.API_URL}/users`, "GET");
  return res;
}

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
      categoryId: Number(categoryId),
      ...user,
    }),
    cache: "no-store",
  });

  return res.json();
}

export async function updateUserByUsername2(
  access_token: string,
  username: string,
  data: any
) {
  const res = await fetchAuthorized(
    `${process.env.API_URL}/users/${username}`,
    "PATCH",
    access_token,
    data
  );

  return res;
}

export async function getUser(access_token: string) {
  const res = await fetch(`${process.env.API_URL}/auth/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  return await res.json();
}

export async function getProfile(access_token: string): Promise<TProfile> {
  const res = await fetch(`${process.env.API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  let data = await res.json();

  // data.data.pfp = `${process.env.API_URL}/public/${data.data.pfp}`;

  return data.data;
}

export async function getUserByUsername(username: string) {
  const res = await fetch(`${process.env.API_URL}/users?username=${username}`, {
    cache: "no-store",
  });
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
    cache: "no-store",
  });

  await setSession(session.access_token);

  return await res.json();
}

export async function getUsersByCategoryName(name: string) {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const res = await fetch(`${process.env.API_URL}/users/category/${name}`, {
    cache: "no-store",
  });
  return await res.json();
}

export async function validateAdmin(access_token: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/validate-admin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
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
    cache: "no-store",
  });

  return {
    status: 200,
  };
}
