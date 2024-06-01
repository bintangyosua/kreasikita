import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import React from "react";
import SupportersTable from "./data-table";

export default function Page() {
  return (
    <Layout page="supporters">
      <h1 className="text-5xl font-bold w-full lg:w-2/3 xl:1/2 mx-auto mb-3">
        Supporters
      </h1>

      {/* Statistics */}
      <Section>
        <div className="p-5">
          <div className="w-full flex flex-col gap-3 sm:flex-row mb-4">
            <CardLayout name="Supporters" num={"345"} />
            <CardLayout name="Last 30 days" num={"Rp345.000,-"} />
            <CardLayout name="All-time" num={"Rp412.000,-"} />
          </div>

          <SupportersTable />
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
