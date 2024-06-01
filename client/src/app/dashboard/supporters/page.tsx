import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import React from "react";
// import { DataTable } from "./data-table";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type Donation = {
  id: number;
  amount: number;
  email: string;
  name: string;
  message: string;
};

const donations: Donation[] = [
  {
    id: 1,
    name: "Danjin",
    email: "danjin@gg.com",
    amount: 10000,
    message: "Kak",
  },
  {
    id: 2,
    name: "Josephine",
    email: "josephind@outlook.com",
    amount: 24000,
    message: "Apa kabar?",
  },
];

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

          {/* Table */}
          <DataTable
            size="small"
            value={donations}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Nama"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="amount" header="Total Donasi"></Column>
          </DataTable>
        </div>
        {/* <DataTable columns={columns} data={donations}></DataTable> */}
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
