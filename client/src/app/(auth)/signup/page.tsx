"use server";

import Navbar from "@/components/auth/navbar";
import React from "react";
import Client from "./client";
import { getCategories } from "@/lib/api/category";

export default async function Page() {
  const categories = await getCategories();
  return (
    <div className="container mx-auto min-h-screen flex flex-col">
      <Navbar />
      <div>
        <Client categories={categories} />
      </div>
    </div>
  );
}
