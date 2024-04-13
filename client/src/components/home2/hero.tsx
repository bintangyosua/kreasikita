import React from "react";
import Button from "../button/button";
import Hero1 from "../svgs/hero/hero1";
import Hero2 from "../svgs/hero/hero2";
import Hero3 from "../svgs/hero/hero3";

export default function Hero() {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="hidden lg:flex">
        <Hero1 />
      </div>
      <div className="lg:w-full h-[50vh] flex flex-col gap-5 justify-center items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-center tracking-wide">
          Dukung bakat,
          <br /> ciptakan perubahan
        </h1>
        <p className="text-center text-lg w-3/4">
          Terima dukungan. Mulai keanggotaan. Siapkan karya. Ini lebih mudah
          dari yang Anda kira.
        </p>
        <Button name="Mulai Halaman Ku" />
        <span>It’s free and takes less than a minute!</span>
      </div>
      <div className="hidden h-full lg:flex justify-between gap-10 items-center flex-col">
        <Hero2 />
        <Hero3 />
      </div>
    </div>
  );
}
