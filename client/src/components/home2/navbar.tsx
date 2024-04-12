"use client";

import { useState } from "react";
import Icon from "../svgs/Icon";
import Category from "../svgs/Category";
import { PiArticleMedium } from "react-icons/pi";
import { SlLogin } from "react-icons/sl";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className=" border-b-gray-0 border-b-[1px] py-1">
      <div className="container mx-auto">
        <div className="bg-white sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 ">
          <div className="flex items-center justify-between px-4 py-3 sm:p-0">
            <div className="text-black text-2xl font-semibold tracking-widest">
              KREASIKITA
            </div>
            <div className="sm:hidden">
              <button
                onClick={() => setOpen(!open)}
                type="button"
                className="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  {open ? (
                    <path
                      v-if="isOpen"
                      fillRule="evenodd"
                      fill="black"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      v-if="!isOpen"
                      fill="black"
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
          <nav
            // className="isOpen ? 'block' : 'hidden'"
            className={`flex flex-col gap-2 px-2 pt-2 pb-4 sm:flex sm:flex-row sm:gap-3 sm:p-0 ${
              open ? "block" : "hidden"
            }`}>
            <Link href="/kategori" name="Kategori" icon={<Category />} />
            <Link href="/blog" name="Blog" icon={<PiArticleMedium />} />
            <a href="/signin" className="flex justify-between items-center">
              <button className="flex gap-1 items-center bg-purple px-3 py-1 rounded-full text-white">
                <SlLogin />
                <span>Sign In</span>
              </button>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Link({
  href,
  icon,
  name,
}: {
  href: string;
  icon: React.ReactElement;
  name: string;
}) {
  return (
    <a
      href={href}
      className="px-2 py-1 text-black rounded hover:text-gray-800 flex items-center gap-1">
      <div className="mb-0.5">{icon}</div>
      <div className="block">{name}</div>
    </a>
  );
}
