import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import React from "react";
import GiftsTable from "./data-table";

export default function Page() {
  return (
    <Layout page="gifts">
      <h1 className="text-5xl font-bold w-full lg:w-2/3 xl:1/2 mx-auto mb-3">
        My Gifts
      </h1>

      <Section>
        <div className="p-5">
          <div className="w-full flex flex-col gap-3 sm:flex-row mb-4"></div>
          <GiftsTable />
        </div>
      </Section>
    </Layout>
  );
}

function CardLayout({ num, name }: { num: string; name: string }) {
  return (
    <div className="sm:w-1/3 flex flex-col gap-1 px-3 py-3 rounded-xl w-full">
      <h2 className="text-2xl font-bold">{num}</h2>
      <span className="">{name}</span>
    </div>
  );
}
