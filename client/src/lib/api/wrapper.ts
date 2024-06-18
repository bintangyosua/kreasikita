import { getSession } from "../session";

export async function fetchAuthorized(
  url: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  access_token: string,
  body?: any
) {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      method,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch");
  }
}

export async function fetchUnAuthorized(
  url: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  body?: any
) {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (res.ok) {
      return await res.json();
    }

    switch (res.status) {
      case 401:
        throw new Error("Unauthorized");
      default:
        throw new Error("Failed to fetch");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch");
  }
}
