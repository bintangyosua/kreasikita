"use server";

import { TCreatePayout } from "@/types/types";
import { fetchAuthorized } from "./wrapper";

export async function getPayoutsByUsername(access_token: string) {
  const res = await fetchAuthorized(
    `${process.env.API_URL}/payouts/by-username`,
    "GET",
    access_token
  );

  return res;
}

export async function getPayoutsAdmin(access_token: string) {
  const res = await fetchAuthorized(
    `${process.env.API_URL}/payouts/admin`,
    "GET",
    access_token
  );

  return res;
}

export async function createPayout(access_token: string, data: TCreatePayout) {
  const res = await fetchAuthorized(
    `${process.env.API_URL}/payouts`,
    "POST",
    access_token,
    data
  );

  return res;
}
