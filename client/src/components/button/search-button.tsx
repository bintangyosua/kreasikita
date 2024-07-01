import { Box, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchButton() {
  return (
    <div className={``}>
      <div>
        <CiSearch size={18} />
      </div>
      <input
        disabled
        type="text"
        placeholder="Cari kreator"
        className="appearance-none border-none outline-none w-full"
      />
    </div>
  );
}
