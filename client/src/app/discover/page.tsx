"use server";

import HomeLayout from "@/components/layouts/home-layout";
import { getUsers, getUsersByCategoryName, searchUsers } from "@/lib/api/users";

import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import Client from "./client";

export default async function Page({
  searchParams: { search: keywords = "" },
}: {
  searchParams: { search: string };
}) {
  const users = keywords ? await searchUsers(keywords) : await getUsers();

  return (
    <HomeLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl">Explore lebih dari 10000 Kreator</h1>
        <Client users={users.data} />
      </div>
    </HomeLayout>
  );
}
