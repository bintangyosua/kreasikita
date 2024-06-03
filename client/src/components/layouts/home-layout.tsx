"use server";

import React from "react";
import Navbar from "../home2/navbar";
import Footer from "../home2/footer";
import { getCategories } from "@/lib/api/category";
import { getSession } from "@/lib/session";
import { getProfile } from "@/lib/api/users";

export default async function HomeLayout({
  children,
  category,
}: {
  children: React.ReactNode;
  category?: string;
}) {
  const session = await getSession();
  const categories = await getCategories();
  if (session.isSignedIn) {
    const profile = await getProfile(session.access_token);
    console.log({ profile });

    return (
      <div className="container mx-auto min-h-screen flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <Navbar
            session={session}
            profile={profile}
            categories={categories}
            currentCategory={category}
          />
          <>{children}</>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        <Navbar
          session={session}
          categories={categories}
          currentCategory={category}
        />
        <>{children}</>
      </div>
      <Footer />
    </div>
  );
}
