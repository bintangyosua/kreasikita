"use server";

import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProfile } from "@/lib/api/users";
import { getSession } from "@/lib/session";
import { Avatar, User } from "@nextui-org/react";

export default async function Page() {
  const session = await getSession();
  const user = await getProfile(session.access_token);

  return (
    <Layout page="home" type="dashboard">
      <Section>
        <div className="flex flex-col gap-3 pb-10">
          <div
            style={{
              backgroundImage:
                "url('https://cdn.wallpapersafari.com/22/71/Kj7nrU.png')",
              backgroundPosition: "center",
            }}
            className="h-28 sm:h-32 lg:h-48 w-full rounded-t-3xl"></div>
          <div className="flex items-center justify-start px-5 mt-3">
            <div>
              {
                <User
                  name={user.name}
                  description={`@${user.username}`}
                  classNames={{
                    name: "text-3xl font-bold mt-4",
                    base: "-mt-10",
                    description: "text-md text-gray-500",
                  }}
                  avatarProps={{
                    src: user.pfp,
                    className:
                      "w-28 h-28 rounded-full object-cover ml-16 -mt-4",
                    classNames: {
                      name: "text-3xl",
                    },
                  }}
                />
              }
            </div>
            <div className="-mt-4 justify-end w-full pl-10 pr-2 hidden sm:flex">
              {/* <div className="flex flex-col text-center">
                <span className="font-bold text-3xl">{user.name}</span>
                <span className="text-gray-500">@{user.username}</span>
              </div> */}
              <div className="flex flex-col">
                <button className="rounded-full bg-red-300 px-4 py-1">
                  {user.category.name}
                </button>
                <span>345.000 Supporters</span>
              </div>
            </div>
          </div>

          <div className="px-5 lg:ml-20 flex flex-col gap-10">
            <div className="sm:hidden">
              <div className="flex items-center gap-3 text-left">
                <span className="font-bold text-3xl">Minuettaro</span>
                <span className="text-gray-500">@Minuettaro</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-full bg-red-300 px-4 py-1 w-fit">
                  Developer
                </button>
                <span>345.000 Supporters</span>
              </div>
            </div>
            <p className="md:mt-5 ">
              {user.description ? user.description : "Tidak ada deskripsi"}
            </p>
            <div className="font-bold flex flex-col gap-2">
              <h2 className="text-3xl">Jumlah Dukungan</h2>
              <h2 className="text-4xl">
                IDR{" "}
                {user.balance.toLocaleString("id-ID", {
                  currency: "IDR",
                })}
              </h2>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

function CardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="shadow-none">{children}</CardContent>
    </Card>
  );
}
