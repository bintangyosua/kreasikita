"use client";

import { Button } from "@nextui-org/react";
import { Box, Flex, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchButton() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  return (
    <form
      className="flex gap-2 items-center"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        const url = encodeURI(value);
        router.push(`/discover?search=${url}`);
      }}>
      <div
        className={`flex items-center gap-2 border border-gray-300 px-3 py-2 shadow-md w-full`}>
        <div>
          <CiSearch size={18} />
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          // required
          placeholder="Cari kreator"
          className="appearance-none border-none outline-none w-full"
        />
      </div>
      <Button
        type="submit"
        className="rounded-none border border-gray-300 shadow-md bg-purple text-white font-bold p-0 max-w-fit"
        isIconOnly
        variant="faded">
        <CiSearch size={20} />
      </Button>
    </form>
  );
}
