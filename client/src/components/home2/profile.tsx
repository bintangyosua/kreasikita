"use client";

import { deleteSession, SessionType } from "@/lib/session";
import { TProfile } from "@/types/profile";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { AvatarIcon, DashboardIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";

export default function Profile({ profile }: { profile: TProfile }) {
  return (
    <Dropdown>
      <DropdownTrigger className="h-fit">
        {/* <Button variant="bordered">Open Menu</Button> */}
        <User
          className="hover:cursor-pointer"
          name={profile?.name}
          description={`@${profile.username}`}
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="p-1">
        <DropdownItem key="new" className="p-0">
          <a
            href={`/${profile.username}`}
            className="w-full flex items-center gap-2 p-2">
            <AvatarIcon width={22} height={22} /> Profile
          </a>
        </DropdownItem>
        <DropdownItem key="copy" className="p-0">
          <a href={`/dashboard`} className="w-full flex items-center gap-2 p-2">
            <DashboardIcon width={18} height={18} /> Dashboard
          </a>
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger w-full p-0"
          color="danger"
          onClick={async () => {
            await deleteSession();
            toast.error("Berhasil sign out");
          }}>
          <span className="flex items-center gap-2 p-2">
            <IoIosLogOut size={22} /> <span>Sign out</span>
          </span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
