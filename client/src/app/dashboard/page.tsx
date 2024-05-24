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
    <Layout>
      <Section>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3">
            <div className="bg-gray-200 h-16 w-16 rounded-full"></div>
            <div className="flex flex-col">
              <span>Minuettaro</span>
              <span className="text-sm text-gray-500">
                kreasikita.vercel.app/minuettaro
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-3 items-center">
            <h2 className="text-2xl">Pendapatan</h2>
            <button className="bg-purple rounded-2xl text-white px-3 py-2">
              30 Hari Terakhir
            </button>
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">
          Rp{(345000).toLocaleString("id-ID")},-
        </h2>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold">Pendukung</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Cards */}
          <Card className="shadow-none border-gray-500 px-3 py-2 flex flex-row items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-purple"></div>
            <div>
              <h3 className="text-lg font-bold mb-0">Minuettaro</h3>
              <span className="text-sm text-gray-500">minuettaro</span>
            </div>
          </Card>
          <Card className="shadow-none border-gray-500 px-3 py-2 flex flex-row items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-500"></div>
            <div>
              <h3 className="text-lg font-bold mb-0">Minuettaro</h3>
              <span className="text-sm text-gray-500">minuettaro</span>
            </div>
          </Card>
          <Card className="shadow-none border-gray-500 px-3 py-2 flex flex-row items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-500"></div>
            <div>
              <h3 className="text-lg font-bold mb-0">Minuettaro</h3>
              <span className="text-sm text-gray-500">minuettaro</span>
            </div>
          </Card>
          <Card className="shadow-none border-gray-500 px-3 py-2 flex flex-row items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-500"></div>
            <div>
              <h3 className="text-lg font-bold mb-0">Minuettaro</h3>
              <span className="text-sm text-gray-500">minuettaro</span>
            </div>
          </Card>
          <Card className="shadow-none border-gray-500 px-3 py-2 flex flex-row items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-500"></div>
            <div>
              <h3 className="text-lg font-bold mb-0">Minuettaro</h3>
              <span className="text-sm text-gray-500">minuettaro</span>
            </div>
          </Card>
          <Card className="shadow-none border-gray-500 px-3 py-2 flex flex-row items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-500"></div>
            <div>
              <h3 className="text-lg font-bold mb-0">Minuettaro</h3>
              <span className="text-sm text-gray-500">minuettaro</span>
            </div>
          </Card>
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
