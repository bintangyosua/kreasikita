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
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { NextUIProvider } from "@nextui-org/react";

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

export default function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  return (
    <NextUIProvider>
      <div className="w-full flex flex-col md:flex-row bg-gray-200 h-screen">
        <div className="md:hidden">&nbsp;</div>
        <div className="flex flex-row justify-between px-8 py-2 bg-white rounded-full mx-3 h-12 items-center md:hidden">
          <div>asdads</div>
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
        <nav className="bg-white w-72 hidden md:flex md:flex-col px-6 py-5 gap-3">
          <a className="flex items-center mb-10" href="/">
            <KreasiKita size={48} color="black" />
            <h1 className="text-3xl font-bold font-['Poppins'] ml-1">
              KREASIKITA
            </h1>
          </a>
          <ul className="space-y-5">
            {navs.map((navItem) => (
              <li key={navItem.id}>
                <a
                  className={`flex items-center gap-3 text-[20px] ${
                    navItem.id === page ? "bg-gray-200 rounded-xl" : ""
                  }`}
                  href={`/dashboard/${navItem.link}`}>
                  <navItem.icon
                    color={navItem.id === page ? "purple" : "black"}
                  />
                  {navItem.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col gap-5 px-3 w-full mt-16">{children}</div>
      </div>
    </NextUIProvider>
  );
}
