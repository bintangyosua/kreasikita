import React from "react";
import JumlahKreator from "../svgs/JumlahKreator";
import JumlahSupporters from "../svgs/JumlahSupporters";
import JumlahTerkumpul from "../svgs/JumlahTerkumpul";

export default function Stats() {
  return (
    <div className="flex flex-col sm:flex-row w-full sm:w-fit mx-auto justify-center items-center border-gray-300 shadow-md border-separate border-spacing-1 border overflow-auto ">
      <Card name="Kreator" count={345000} icon={JumlahKreator} />
      <Card name="Supporters" count={3000} icon={JumlahSupporters} />
      <Card
        name="Uang yang Terkumpul (IDR)"
        count={20431500}
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
