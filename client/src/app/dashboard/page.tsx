import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <Layout page="home">
      <Section>
        <div className="flex flex-col gap-3 pb-10">
          <div
            style={{
              backgroundColor: "#5CCCC6",
            }}
            className="h-32 sm:h-48 lg:h-64 w-full rounded-t-3xl"></div>
          <div className="flex items-center justify-start px-5">
            <div>
              <div
                style={{
                  backgroundColor: "#5B5BD6",
                }}
                className="w-28 h-28 rounded-full ml-16 -mt-12"></div>
            </div>
            <div className="-mt-4 justify-between w-full pl-10 pr-2 hidden sm:flex">
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
              Selamat datang di akun penuh kejutan, semoga menyenangkan dan
              tetap gembira
            </p>
            <div className="font-bold flex flex-col gap-2">
              <h2 className="text-3xl">Pendapatan</h2>
              <h2 className="text-4xl">IDR 10.000.000,00</h2>
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
