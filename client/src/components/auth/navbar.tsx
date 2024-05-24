import React from "react";
import KreasiKita from "../svgs/KreasiKita";

export default function Navbar() {
  return (
    <header className="border-b-gray-0 border-b-[1px] py-1">
      <div className="bg-white sm:flex sm:justify-between sm:items-center gap-3 sm:py-3 ">
        <div className="flex items-center justify-between py-3 sm:p-0">
          <div className="text-black text-2xl font-semibold tracking-[0.05em] flex items-center gap-1">
            <a href="/" className="flex items-center gap-1">
              <KreasiKita size={48} color={"black"} /> <span>KREASIKITA</span>
            </a>
          </div>
          <div className="sm:hidden"></div>
        </div>
      </div>
    </header>
  );
}
