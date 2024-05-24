"use client";

import React, { useState } from "react";

export default function Payment() {
  const [amount, setAmount] = useState<string>("");
  return (
    <div className="border-gray-300 border rounded-3xl p-5 flex flex-col text-black gap-5">
      <div className="flex items-center gap-3">
        <span className="w-1/5 text-3xl block font-bold">IDR</span>
        <input
          placeholder="Jumlah"
          className="bg-blackA2 text-xl shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] py-5 px-[12px] text-[15px] leading-none text-black outline-none w-full outline-gray-300"
          value={amount}
          onChange={(e) => {
            if (/^\d*$/.test(e.currentTarget.value)) {
              setAmount(e.currentTarget.value);
            }
          }}
          style={{
            appearance: "textfield",
            WebkitAppearance: "none",
            margin: "none",
            MozAppearance: "none",
          }}
          pattern="[0-9]*"
          type="text"
          id="firstName"
        />
      </div>
      <div className="flex items-center gap-3 h-fit">
        <button
          value={10000}
          className="rounded-xl bg-[#5CCCC6] p-2 w-full text-xl font-bold text-center hover:bg-[#55B6B3] cursor-pointer"
          onClick={(e) => setAmount(e.currentTarget.value)}>
          10K
        </button>
        <button
          value={25000}
          onClick={(e) => setAmount(e.currentTarget.value)}
          className="rounded-xl bg-[#5CCCC6] p-2 w-full text-xl font-bold text-center hover:bg-[#55B6B3] cursor-pointer">
          25K
        </button>
        <button
          value={50000}
          onClick={(e) => setAmount(e.currentTarget.value)}
          className="rounded-xl bg-[#5CCCC6] p-2 w-full text-xl font-bold text-center hover:bg-[#55B6B3] cursor-pointer">
          50K
        </button>
        <button
          value={100000}
          onClick={(e) => setAmount(e.currentTarget.value)}
          className="rounded-xl bg-[#5CCCC6] p-2 w-full text-xl font-bold text-center hover:bg-[#55B6B3] cursor-pointer">
          100K
        </button>
      </div>
      <textarea
        placeholder="Pesan kamu"
        className="inline-flex h-32 appearance-none items-center justify-center rounded-[4px] py-[12px] px-[12px] text-[15px]text-black outline-none w-full outline-gray-300 "
        required
      />
      <button className=" w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[#5CCCC6] px-[15px] font-medium leading-none mt-[10px] border py-5 hover:bg-[#55B6B3]">
        Donasi
      </button>
    </div>
  );
}
