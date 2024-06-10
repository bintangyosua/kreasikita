import { SessionType } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getIronSession<SessionType>(cookies(), {
    password: "vsfZ7hdzLUmW6feA46Bi1jBZp1pHRgx6",
    cookieName: "kreasikita",
  });

  session.destroy();

  redirect("/");
}
