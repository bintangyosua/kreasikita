"s=use server";

import React from "react";
import KreasiKita from "../svgs/KreasiKita";
import { Divider, Skeleton } from "@nextui-org/react";
import SideBarItems, { NavType } from "./sidebar-items";

export default function Sidebar({
  page,
  type,
}: {
  page: string;
  type: "dashboard" | "admin";
}) {
  return (
    <nav className="bg-white w-64 hidden md:flex md:flex-col px-6 py-5 gap-3 h-full left-0 top-0 overflow-x-hidden fixed z-10 border-r-2 border-gray-200">
      <a className="flex items-center mb-10" href="/">
        <KreasiKita size={35} color="black" />
        <h1 className="text-xl font-bold font-['Poppins'] ml-1">KREASIKITA</h1>
      </a>
      <Divider />
      <ul className="space-y-4">
        <SideBarItems page={page} type={type} />
      </ul>
    </nav>
  );
}
