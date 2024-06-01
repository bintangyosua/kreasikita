"use server";

import HomeLayout from "@/components/layouts/home-layout";
import { getUsersByCategoryName } from "@/lib/api/users";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  // const users = await getUsersByCategoryName(params.slug);
  return redirect("/category/youtuber");

  return (
    <HomeLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl">Explore lebih dari 10000 Kreator</h1>
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-3 lg:gap-5 xl:gap-10">
          {/* {users ? <Card name={users.name} /> : <p>404 Not Found</p>} */}
        </section>
      </div>
    </HomeLayout>
  );
}

function Card({
  name,
  bannerImg,
  profileImg,
  username,
  shortDesc,
}: {
  name?: string;
  bannerImg?: string;
  profileImg?: string;
  username?: string;
  shortDesc?: string;
}) {
  return (
    <a href="/minuettaro">
      <div className="rounded-2xl w-full flex flex-col gap-3 shadow-md pb-10">
        <div
          style={{ backgroundColor: "cadetblue" }}
          className="h-28 rounded-t-2xl relative z-0"></div>
        <div
          style={{
            backgroundColor: "#5B5BD6",
          }}
          className="w-24 h-24 mx-auto -mt-16 z-10 rounded-full"></div>
        <div className="mx-auto text-center">
          <h3 className="mx-auto">
            <b>Minuettaro si Anak Jawa</b>
          </h3>
          <h4 className="mx-auto text-sm">@Minuettaro</h4>
          <p>Some description</p>
        </div>
      </div>
    </a>
  );
}
