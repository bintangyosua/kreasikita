import React from "react";

export default function Stats() {
  return (
    <div className="flex flex-row sm:w-fit mx-auto justify-center items-center border-gray-300 shadow-md border-separate border-spacing-1 border overflow-auto ">
      <Card name="Kreator" count={345000} />
      <Card name="Program Sosial" count={3000} />
      <Card name="Uang yang Terkumpul (IDR)" count={20431500} />
    </div>
  );
}

function Card({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex flex-col items-center justify-center sm:w-52 md:w-64 h-28 border border-gray-300 px-3">
      <p className="text-2xl text-purple">{count.toLocaleString("id-Id")}</p>
      <p className="text-sm text-center">{name}</p>
    </div>
  );
}
