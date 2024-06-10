"use server";

import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import { getPayoutsByUsername } from "@/lib/api/payout";
import { getSession } from "@/lib/session";
import { Code } from "@nextui-org/react";
import PayoutsTable from "./data-table";

export default async function Page() {
  const session = await getSession();
  const payouts = await getPayoutsByUsername(session.access_token);
  console.log({ payouts });
  return (
    <Layout page="payouts" type="dashboard">
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
