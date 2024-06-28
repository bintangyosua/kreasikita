"use server";

import { fetchAuthorized, fetchUnAuthorized } from "./wrapper";

export async function getAllStats() {
  const res = await fetchUnAuthorized(`${process.env.API_URL}/stats`, "GET");
  return res.data;
}

export async function getStatsByProfile(
  username: string,
  access_token: string
) {
  const res = await fetchAuthorized(
    `${process.env.API_URL}/stats/by-profile/${username}`,
    "GET",
    access_token
  );

  console.log({ res });

  return res.data;
}
