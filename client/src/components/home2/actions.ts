"use server";

import { validate } from "@/lib/api/auth";

export async function check(access_token: string) {
  const res = await validate(access_token);

  if (!res.sub) return false;

  return true;
}
