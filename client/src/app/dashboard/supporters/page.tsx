import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";

type Donation = {
  id: number;
  amount: number;
  name: string;
  message: string;
};

const donations: Donation[] = [
  {
    id: 1,
    name: "John Doe",
    amount: 10000,
    message: "Kak",
  },
  {
    id: 2,
    name: "Jane Doe",
    amount: 24000,
    message: "Apa kabar?",
  },
];

export default function Page() {
  return (
    <Layout page="supporters">
      {/* Statistics */}
      <Section>
        <div className="w-full flex flex-col gap-3 sm:flex-row">
          <CardLayout name="Supporters" num={"345"} />
          <CardLayout name="Last 30 days" num={"Rp345.000,-"} />
          <CardLayout name="All-time" num={"Rp412.000,-"} />
        </div>
      </Section>
      <Section>
        <DataTable columns={columns} data={donations}></DataTable>
      </Section>
    </Layout>
  );
}

function CardLayout({ num, name }: { num: string; name: string }) {
  return (
    <div className="border sm:w-1/3 flex flex-col gap-1 border-gray-500 px-3 py-3 rounded-xl w-full">
      <h2 className="text-2xl font-bold">{num}</h2>
      <span className="">{name}</span>
    </div>
  );
}
