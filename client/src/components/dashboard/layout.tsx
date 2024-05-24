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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
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
      <div className="bg-white w-72 hidden md:flex md:flex-col px-6 py-5 gap-3">
        <div className="rounded-xl bg-gray-200 px-4 py-2">Home</div>
        <div className="px-4 py-2">Supporters</div>
        <div className="px-4 py-2">Gifts</div>
        <div className="px-4 py-2">Settings</div>
      </div>
      {/* Main Content */}
      <div className="flex flex-col gap-5 px-3 mt-4 w-full">{children}</div>
    </div>
  );
}
