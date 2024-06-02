"use client";

import { deleteSession, SessionType } from "@/lib/session";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { AvatarIcon, DashboardIcon } from "@radix-ui/react-icons";
import React from "react";
import { IoIosLogOut } from "react-icons/io";

export default function Profile({ session }: { session: SessionType }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        {/* <Button variant="bordered">Open Menu</Button> */}
        <User
          className="hover:cursor-pointer"
          name={session.name}
          description={`@${session.username}`}
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">
          <a
            href={`/${session.username}`}
            className="w-full flex items-center gap-2">
            <AvatarIcon width={22} height={22} /> Profile
          </a>
        </DropdownItem>
        <DropdownItem key="copy">
          <a href={`/dashboard`} className="w-full flex items-center gap-2">
            <DashboardIcon width={18} height={18} /> Dashboard
          </a>
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger w-full"
          color="danger"
          onClick={async () => {
            await deleteSession();
          }}>
          <span className="flex items-center gap-2">
            <IoIosLogOut size={22} /> <span>Sign out</span>
          </span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
