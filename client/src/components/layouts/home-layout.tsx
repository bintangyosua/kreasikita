"use server";

import React from "react";
import Navbar from "../home2/navbar";
import Footer from "../home2/footer";
import { getSession } from "@/lib/session";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  console.log(session);

  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        <Navbar session={session} />
        <>{children}</>
      </div>
      <Footer />
    </div>
  );
}
