"use client";

import { Button } from "@nextui-org/react";
import { Box, Flex, TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlBasketLoaded } from "react-icons/sl";

export default function SearchButton() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("search") || "");
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="flex gap-2 items-center"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {}, 1000);
        const url = encodeURI(value);
        setLoading(false);
        router.push(`/discover?search=${url}`);
      }}>
      <div
        className={`flex items-center gap-2 border border-gray-300 px-3 py-2 shadow-md w-full`}>
        <div>
          <CiSearch size={18} />
        </div>
        <input
          value={value}
          onChange={(e) =>
            setValue(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))
          }
          type="text"
          placeholder="Cari kreator"
          className="appearance-none border-none outline-none w-full"
        />
      </div>
      <Button
        isLoading={loading}
        type="submit"
        className="rounded-none border border-gray-300 shadow-md bg-purple text-white font-bold p-0 max-w-fit"
        isIconOnly
        variant="faded">
        <CiSearch size={20} />
      </Button>
    </form>
  );
}
