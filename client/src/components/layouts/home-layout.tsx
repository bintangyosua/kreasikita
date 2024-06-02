"use server";

import React from "react";
import Navbar from "../home2/navbar";
import Footer from "../home2/footer";
import { getSession } from "@/lib/session";
import { getCategories } from "@/lib/api/category";

export default async function HomeLayout({
  children,
  category,
}: {
  children: React.ReactNode;
  category?: string;
}) {
  const session = await getSession();
  const categories = await getCategories();

  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        <Navbar
          session={session}
          categories={categories.data}
          currentCategory={category}
        />
        <>{children}</>
      </div>
      <Footer />
    </div>
  );
}
