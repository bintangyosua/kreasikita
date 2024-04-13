import { Box, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchButton() {
  return (
    <Flex direction="column" gap="3" maxWidth="400px">
      <Box
        maxWidth="200px"
        className={`flex items-center gap-2 border border-gray-300 px-3 py-2 shadow-md`}>
        <div>
          <CiSearch size={18} />
        </div>
        <input
          type="text"
          placeholder="Cari kreator"
          className="appearance-none border-none outline-none w-full"
        />
      </Box>
    </Flex>
  );
}
