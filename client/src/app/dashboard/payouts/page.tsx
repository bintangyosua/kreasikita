"use server";

import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import { getPayoutsByUsername } from "@/lib/api/payout";
import { getSession } from "@/lib/session";
import {
  Autocomplete,
  AutocompleteItem,
  Code,
  Select,
  SelectItem,
} from "@nextui-org/react";
import PayoutsTable from "./data-table";
import { getBanks } from "@/lib/api/bank";
import Client from "./client";

export default async function Page() {
  const session = await getSession();
  const payouts = await getPayoutsByUsername(session.access_token);
  const banks = await getBanks();
  return (
    <Layout page="payouts" type="dashboard">
      <Section>
        <h1 className="text-3xl w-full lg:w-3/3 xl:1/2 mx-auto mb-3">
          Request Payout
        </h1>
        <Client banks={banks} />
      </Section>
      <Section>
        {payouts.data && payouts.data.length > 0 ? (
          <PayoutsTable payouts={payouts.data} />
        ) : (
          <Code color="danger" className="h-10 flex items-center">
            Belum ada payout yang diminta
          </Code>
        )}
      </Section>
    </Layout>
  );
}
