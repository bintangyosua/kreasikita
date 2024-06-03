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

export default function SideBarItems({ page }: { page: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {navs.map((navItem) => (
        <li key={navItem.id}>
          {loading ? (
            <Skeleton className="rounded-lg">
              <div className="h-9 rounded-lg bg-default-300"></div>
            </Skeleton>
          ) : (
            <a
              href={`/dashboard/${navItem.link}`}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }}
              className={`flex items-center gap-3 text-xl hover:cursor-pointer ${
                navItem.id === page ? "bg-gray-200 p-1 rounded-xl" : ""
              }`}>
              <navItem.icon
                color={navItem.id === page ? "purple" : "black"}
                size={25}
              />
              {navItem.name}
            </a>
          )}
        </li>
      ))}
    </>
  );
}
