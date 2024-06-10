"use server";

import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import React from "react";
import GiftsTable from "./data-table";
import { getDonationsByReceiver } from "@/lib/api/donation";
import { getSession } from "@/lib/session";
import { Code } from "@nextui-org/react";

export default async function Page() {
  const session = await getSession();
  const donations = await getDonationsByReceiver();

  return (
    <Layout page="gifts">
      <h1 className="text-3xl w-full lg:w-3/3 xl:1/2 mx-auto mb-3">My Gifts</h1>
      <Section>
        {donations.data && donations.data.length > 0 ? (
          <GiftsTable donations={donations.data} />
        ) : (
          <Code color="danger" className="h-10 flex items-center">
            Belum ada dukungan yang diterima
          </Code>
        )}
      </Section>
    </Layout>
  );
}
