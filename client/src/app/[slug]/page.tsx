"use server";

import HomeLayout from "@/components/layouts/home-layout";
import Payment from "@/components/profile/payment";
import { getProfile, getUserByUsername } from "@/lib/api/users";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { TProfile } from "@/types/profile";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await getUserByUsername(params.slug);
  const session = await getSession();

  if (!user.data) {
    notFound();
  }

  const profile: TProfile = await getProfile(session.access_token);

  return (
    <HomeLayout>
      <main className="flex flex-col md:flex-row gap-6">
        {/* Profile */}
        <div className="border-gray-300 border rounded-3xl">
          <div
            style={{
              // backgroundColor: "#5CCCC6",
              backgroundImage: `url('https://www.dexerto.com/cdn-image/wp-content/uploads/2024/05/18/Copy-of-dexerto-feature-images-with-correct-dimensions-2024-05-18T114731.807.jpg?width=3840&quality=60&format=auto')`,
              backgroundPosition: "center",
            }}
            className="h-32 sm:h-48 lg:h-64 w-full rounded-t-3xl"></div>
          <div
            style={{
              backgroundImage: `url('https://i.pinimg.com/736x/bb/70/09/bb7009ddca2189903ab66ea8c8ff778a.jpg')`,
            }}
            className="w-28 h-28 rounded-full mx-auto -mt-12"></div>
          <div className="-mt-12 flex justify-between xl:justify-evenly pl-10 pr-2">
            <div className="flex flex-col text-center">
              <span className="font-bold text-3xl">{user.data.name}</span>
              <span className="text-gray-500">@{user.data.username}</span>
            </div>
            <div className="flex flex-col">
              <a
                href={`/category/${user.data.category.name.toLowerCase()}`}
                className="block w-full">
                <Button
                  className="rounded-full w-full bg-purple text-md text-white px-4 py-1"
                  size="sm">
                  {user.data.category.name}
                </Button>
              </a>
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
        <div className="flex flex-col md:w-2/5 gap-5">
          {/* Payment */}
          {profile && (
            <Payment session={session} profile={profile} creator={user.data} />
          )}
          {!profile && <Payment session={session} creator={user.data} />}
        </div>
      </main>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CardMessage2 />
        <CardMessage2 />
        <CardMessage2 />
        <CardMessage2 />
      </section>
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
    <div className="flex gap-5 items-center justify-between ">
      <div className="bg-red-300 w-20 h-20 rounded-full" />
      <div className="flex flex-col justify-between">
        <span className="text-sm text-gray-600">2 Hari yang lalu</span>
        <span>Zia memberikan 10.000</span>
        <span className="mt-3">Kak sehat?</span>
      </div>
    </div>
  );
}

function CardMessage2() {
  return (
    <Card className="w-full p-0 border border-gray-300" shadow="none">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="full"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Anonymous</p>
          <p className="text-small text-default-500">anonymous</p>
        </div>
      </CardHeader>
      <CardBody>
        <p>Hello there</p>
      </CardBody>
      <Divider />
    </Card>
  );
}
