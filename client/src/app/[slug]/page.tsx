import HomeLayout from "@/components/layouts/home-layout";
import Payment from "@/components/profile/payment";
import React from "react";

export default function Page() {
  return (
    <HomeLayout>
      <main className="flex flex-col md:flex-row gap-10">
        {/* Profile */}
        <div className="border-gray-300 border rounded-3xl pb-20">
          <div
            style={{
              backgroundColor: "#5CCCC6",
            }}
            className="h-32 sm:h-48 lg:h-64 w-full rounded-t-3xl"></div>
          <div
            style={{
              backgroundColor: "#5B5BD6",
            }}
            className="w-28 h-28 rounded-full mx-auto -mt-12"></div>
          <div className="-mt-12 flex justify-between xl:justify-evenly pl-10 pr-2">
            <div className="flex flex-col text-center">
              <span className="font-bold text-3xl">Minuettaro</span>
              <span className="text-gray-500">@Minuettaro</span>
            </div>
            <div className="flex flex-col">
              <button className="rounded-full bg-red-300 px-4 py-1">
                Developer
              </button>
              <span>345.000 Supporters</span>
            </div>
          </div>
          <p className="text-center mt-5 p-3 md:w-2/3 mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            amet sequi, fuga cum, quas laborum sint nulla veritatis libero rerum
            itaque corporis provident labore minima, iste optio ullam. Ratione,
            magnam.
          </p>
        </div>
        <div className="flex flex-col md:w-2/5 gap-10">
          {/* Payment */}
          <Payment />
          <div className="flex flex-col items-start md:items-center border-gray-300 p-5 border rounded-3xl gap-5">
            <CardMessage />
            <CardMessage />
            <CardMessage />
            <CardMessage />
            <CardMessage />
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}

function CardMessage({
  pfpImg,
  name,
  timestamp,
  amount,
  message,
}: {
  pfpImg?: string;
  name?: string;
  timestamp?: Date;
  amount?: number;
  message?: string;
}) {
  return (
    <div className="flex gap-5 items-center justify-between">
      <div className="bg-red-300 w-20 h-20 rounded-full" />
      <div className="flex flex-col justify-between">
        <span className="text-sm text-gray-600">2 Hari yang lalu</span>
        <span>Zia memberikan 10.000</span>
        <span className="mt-3">Kak sehat?</span>
      </div>
    </div>
  );
}
