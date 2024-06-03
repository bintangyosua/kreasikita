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
import Section from "./section";
import KreasiKita from "../svgs/KreasiKita";
import HomeIcon from "../svgs/HomeIcon";
import LoveIcon from "../svgs/LoveIcon";
import GiftIcon from "../svgs/GiftIcon";
import SettingIcon from "../svgs/SettingIcon";
import Dollar from "../svgs/Dollar";
import NextUIProvider from "../providers/nextui";
import { Divider } from "@nextui-org/react";
import Profile from "../home2/profile";
import { getSession } from "@/lib/session";
import { getProfile } from "@/lib/api/users";

const navs = [
  {
    id: "home",
    link: "",
    name: "Home",
    icon: HomeIcon,
  },
  {
    id: "supporters",
    link: "supporters",
    name: "Supporters",
    icon: LoveIcon,
  },
  {
    id: "gifts",
    link: "gifts",
    name: "Gifts",
    icon: GiftIcon,
  },
  {
    id: "payout",
    link: "payout",
    name: "Payout",
    icon: Dollar,
  },
  {
    id: "settings",
    link: "settings",
    name: "Settings",
    icon: SettingIcon,
  },
];

export default async function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  const session = await getSession();
  const profile = await getProfile(session.access_token);

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
      <nav className="bg-white w-64 hidden md:flex md:flex-col px-6 py-5 gap-3 h-full left-0 top-0 overflow-x-hidden fixed z-10 border-r-2 border-gray-200">
        <a className="flex items-center mb-10" href="/">
          <KreasiKita size={35} color="black" />
          <h1 className="text-xl font-bold font-['Poppins'] ml-1">
            KREASIKITA
          </h1>
        </a>
        <Divider />
        <ul className="space-y-4">
          {navs.map((navItem) => (
            <li key={navItem.id}>
              <a
                className={`flex items-center gap-3 text-xl ${
                  navItem.id === page ? "bg-gray-200 p-1 rounded-xl" : ""
                }`}
                href={`/dashboard/${navItem.link}`}>
                <navItem.icon
                  color={navItem.id === page ? "purple" : "black"}
                  size={25}
                />
                {navItem.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col gap-5 w-full items-center md:ml-64 p-5 lg:px-20 xl:px-60">
        <div className="w-full h-10 md:flex justify-end border-b-gray-200 border-b-2 pb-5 hidden">
          <Profile profile={profile.data} />
        </div>
        {children}
      </div>
    </div>
  );
}
