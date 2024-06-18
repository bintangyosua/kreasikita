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
import { MdAdminPanelSettings } from "react-icons/md";
import { toast } from "react-toastify";

export default function Profile({ profile }: { profile: TProfile }) {
  return (
    <Dropdown>
      <DropdownTrigger className="h-fit">
        {/* <Button variant="bordered">Open Menu</Button> */}
        <User
          className="hover:cursor-pointer justify-start"
          name={profile?.name}
          description={`@${profile.username}`}
          avatarProps={{
            src: profile.pfp,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="p-1">
        <DropdownItem key="new" className="p-0" textValue="Profile">
          <a
            href={`/${profile.username}`}
            className="w-full flex items-center gap-2 p-2">
            <AvatarIcon width={22} height={22} /> Profile
          </a>
        </DropdownItem>
        <DropdownItem key="copy" className="p-0" textValue="Dashboard">
          <a href={`/dashboard`} className="w-full flex items-center gap-2 p-2">
            <DashboardIcon width={18} height={18} /> Dashboard
          </a>
        </DropdownItem>
        {profile.role === "admin" &&
          ((
            <DropdownItem key="copy" className="p-0" textValue="Admin">
              <a href={`/admin`} className="w-full flex items-center gap-2 p-2">
                <MdAdminPanelSettings size={20} /> Admin
              </a>
            </DropdownItem>
          ) as any)}
        <DropdownItem
          key="delete"
          className="text-danger w-full p-0"
          color="danger"
          textValue="Sign out"
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
