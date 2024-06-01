"use server";

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
      Authorization: `Bearer ${access_token}`,
    },
  });

  return await res.json();
}

export async function getUserByUsername(username: string) {
  const res = await fetch(`${process.env.API_URL}/users?username=${username}`);
  return await res.json();
}

export async function getUsersByCategoryName(name: string) {
  const res = await fetch(`${process.env.API_URL}/users/category/${name}`, {});
  return await res.json();
}
