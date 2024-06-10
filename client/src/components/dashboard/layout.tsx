"use server";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import Profile from "../home2/profile";
import { deleteValidationSession, getSession } from "@/lib/session";
import { getProfile } from "@/lib/api/users";
import Sidebar from "./sidebar";

export default async function Layout({
  children,
  page,
  type,
}: {
  children: React.ReactNode;
  page: string;
  type: "dashboard" | "admin";
}) {
  const session = await getSession();
  const profile = await getProfile(session.access_token);

  if (!profile) {
    await deleteValidationSession();
  }

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen pb-20">
      <div className="md:hidden">&nbsp;</div>
      <div className="flex flex-row justify-between px-8 py-2 bg-white rounded-full mx-3 h-12 items-center md:hidden">
        <div className="font-medium">
          {page.charAt(0).toUpperCase() + page.slice(1)}
        </div>
        <div className="visible md:hidden">
          <Sheet>
            <SheetTrigger>
              <RxHamburgerMenu size={"30"} />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Sidebar */}

      <Sidebar page={page} type={type} />

      {/* Main Content */}
      <div className="flex flex-col gap-5 w-full items-center md:ml-64 p-5 lg:px-20 xl:px-60">
        <div className="w-full md:flex justify-end border-b-gray-200 border-b-2 pb-5 hidden">
          <Profile profile={profile} />
        </div>
        {children}
      </div>
    </div>
  );
}
