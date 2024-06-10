"use client";

import React, { useState } from "react";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import HomeIcon from "../svgs/HomeIcon";
import LoveIcon from "../svgs/LoveIcon";
import GiftIcon from "../svgs/GiftIcon";
import Dollar from "../svgs/Dollar";
import SettingIcon from "../svgs/SettingIcon";
import { redirect } from "next/navigation";

export type NavType = {
  id: string;
  link: string;
  name: string;
  icon: any;
};

const navsAdmin: NavType[] = [
  {
    id: "home",
    link: "",
    name: "Donations",
    icon: Dollar,
  },
  {
    id: "payouts",
    link: "payouts",
    name: "Payouts",
    icon: LoveIcon,
  },
];

const navs: NavType[] = [
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
    id: "payouts",
    link: "payouts",
    name: "Payouts",
    icon: Dollar,
  },
  {
    id: "settings",
    link: "settings",
    name: "Settings",
    icon: SettingIcon,
  },
];

export default function SideBarItems({
  page,
  type,
}: {
  page: string;
  type: "dashboard" | "admin";
}) {
  const [loading, setLoading] = useState(false);
  let navItems = type === "admin" ? navsAdmin : navs;
  return (
    <>
      {navItems.map((navItem) => (
        <li key={navItem.id}>
          {loading ? (
            <Skeleton className="rounded-lg">
              <div className="h-9 rounded-lg bg-default-300"></div>
            </Skeleton>
          ) : (
            <Link
              href={`/${type === "admin" ? "admin" : "dashboard"}/${
                navItem.link
              }`}
              onClick={() => {
                setLoading(true);

                if (page === navItem.id) {
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000); // 1000 milliseconds = 1 second
                }
              }}
              className={`flex items-center gap-3 text-xl hover:cursor-pointer ${
                navItem.id === page ? "bg-gray-200 p-1 rounded-xl" : ""
              }`}>
              <navItem.icon
                color={navItem.id === page ? "purple" : "black"}
                size={25}
              />
              {navItem.name}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}
