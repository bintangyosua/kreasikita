import { getSession } from "../session";
import { fetchAuthorized } from "./wrapper";

export async function getBanks() {
  const session = await getSession();
  const res = await fetchAuthorized(
    `${process.env.API_URL}/banks`,
    "GET",
    session.access_token
  );

  return res;
}
