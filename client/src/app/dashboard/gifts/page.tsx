"use server";

import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import React from "react";
import GiftsTable from "./data-table";
import { getDonationsByReceiver } from "@/lib/api/donation";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();
  const donations = await getDonationsByReceiver(session.username);

  return (
    <Layout page="gifts">
      <h1 className="text-3xl w-full lg:w-3/3 xl:1/2 mx-auto mb-3">My Gifts</h1>
      <Section>
        <div>
          <GiftsTable donations={donations.data} />
        </div>
      </Section>
    </Layout>
  );
}
