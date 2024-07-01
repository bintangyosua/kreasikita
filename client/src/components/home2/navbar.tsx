"use client";

import { useEffect, useState } from "react";
import Category from "../svgs/Category";
import {
  PiArrowFatLineLeft,
  PiArticleMedium,
  PiCarProfile,
} from "react-icons/pi";
import { SlLogin } from "react-icons/sl";
import ScrollAreaLayout from "../radix/scroll-area";
import SearchButton from "../button/search-button";
import KreasiKita from "../svgs/KreasiKita";
import { Button } from "@nextui-org/react";

import Profile from "./profile";
import { deleteSession } from "@/lib/session";

export default function Navbar({
  currentCategory,
  session,
  profile,
  categories,
}: {
  currentCategory?: string;
  session: any;
  profile?: any;
  categories: { name: string; id: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <header className="border-b-gray-0 border-b-[1px] py-1">
      <div className="bg-white sm:flex sm:justify-between sm:items-center gap-3 sm:py-3 ">
        <div className="flex items-center justify-between py-3 sm:p-0">
          <div className="text-black text-2xl font-semibold tracking-[0.05em] flex items-center gap-1">
            <a href="/" className="flex items-center gap-1">
              <KreasiKita size={48} color={"black"} /> <span>KREASIKITA</span>
            </a>
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
        <div className="hidden lg:hidden lg:w-4/5">
          <SearchButton />
        </div>
        <nav
          // className="isOpen ? 'block' : 'hidden'"
          className={`flex flex-col gap-2 pt-2 pb-4 sm:flex sm:flex-row sm:gap-3 sm:p-0 ${
            open ? "block" : "hidden"
          }`}>
          <Link href="/category" name="Kategori" icon={<Category />} />
          {/* <Link href="/blog" name="Blog" icon={<PiArticleMedium />} /> */}
          {session.isSignedIn ? (
            <Profile profile={profile} />
          ) : (
            <a href="/signin" className="flex justify-between items-center">
              <Button
                className="flex gap-1 items-center bg-purple px-3 py-1 rounded-full text-white w-full"
                isLoading={loading}
                onClick={() => setLoading(true)}>
                <SlLogin />
                <span>Sign In</span>
              </Button>
            </a>
          )}
        </nav>
      </div>
      <div className="hidden lg:hidden mb-2">
        <SearchButton />
      </div>
      <ScrollAreaLayout>
        <></>
        <div className="flex flex-row gap-3 text-lg justify-center lg:justify-center pb-3">
          {categories.map((value) => (
            <CategoryItem
              currentCategory={currentCategory}
              key={value.id}
              href={value.name.toLowerCase()}
              title={value.name}
            />
          ))}
        </div>
      </ScrollAreaLayout>
    </header>
  );
}

function CategoryItem({
  href,
  title,
  currentCategory,
}: {
  href: string;
  title: string;
  currentCategory?: string;
}) {
  // return <a href={`/category/${href}`}>{title}</a>;
  return (
    <>
      {href === currentCategory ? (
        <Button variant="solid" className="bg-purple/90 text-white text-[16px]">
          {title}
        </Button>
      ) : (
        <a href={`/category/${href}`} className="items-center flex text-[16px]">
          {title}
        </a>
      )}
    </>
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
