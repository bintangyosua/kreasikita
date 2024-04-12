import React from "react";

export default function Stats() {
  return (
    <div>
      <div className="sm:flex flex-col sm:flex-row w-fit mx-auto justify-center items-center border-gray-300 border-spacing-1 shadow-md">
        <Card name="Kreator" count={345000} />
        <Card name="Program Sosial" count={3000} />
        <Card name="Uang yang Terkumpul (IDR)" count={20431500} />
      </div>
    </div>
  );
}

function Card({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex flex-col items-center justify-center w-80 sm:w-52 md:w-64 h-28 border-spacing-2 border-gray-300">
      <p className="text-2xl text-purple">{count.toLocaleString("id-Id")}</p>
      <p className="text-sm">{name}</p>
    </div>
  );
}
