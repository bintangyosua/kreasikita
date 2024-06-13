"use server";

import React from "react";
import JumlahKreator from "../svgs/JumlahKreator";
import JumlahSupporters from "../svgs/JumlahSupporters";
import JumlahTerkumpul from "../svgs/JumlahTerkumpul";
import { getAllStats } from "@/lib/api/stats";

export default async function Stats() {
  const stats = await getAllStats();
  return (
    <div className="flex flex-col sm:flex-row w-full sm:w-fit mx-auto justify-center items-center border-gray-300 shadow-md border-separate border-spacing-1 border overflow-auto ">
      <Card name="Kreator" count={stats.countCreators} icon={JumlahKreator} />
      <Card
        name="Supporters"
        count={stats.countSupporters}
        icon={JumlahSupporters}
      />
      <Card
        name="Uang yang Terkumpul (IDR)"
        count={stats.sumDonations._sum.gross_amount}
        icon={JumlahTerkumpul}
      />
    </div>
  );
}

function Card({
  name,
  count,
  icon,
}: {
  name: string;
  count: number;
  icon: any;
}) {
  return (
    <div className="flex flex-col items-center justify-center sm:w-52 md:w-64 h-28 border border-gray-300 px-3 w-full">
      <div className="flex gap-2 items-center">
        {icon()}
        <div>
          <p className="text-2xl text-purple text-center">
            {count.toLocaleString("id-Id")}
          </p>
          <p className="text-sm text-center ">{name}</p>
        </div>
      </div>
    </div>
  );
}
