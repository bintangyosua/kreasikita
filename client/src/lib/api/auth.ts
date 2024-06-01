"use server";

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
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
