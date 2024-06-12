"use server";

import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/session";
import DonationsTable from "./data-table";
import { Code } from "@nextui-org/react";
import H1 from "@/app/dashboard/h1";
import { getPayoutsAdmin } from "@/lib/api/payout";
import PayoutsTable from "./data-table";

export default async function Page() {
  const session = await getSession();
  const payouts = await getPayoutsAdmin(session.access_token);

  return (
    <Layout page="payouts" type="admin">
      <H1>Request Payout</H1>
      <Section>
        {payouts.data && payouts.data.length > 0 ? (
          <PayoutsTable payouts={payouts.data} session={session} />
        ) : (
          <Code color="danger" className="h-10 flex items-center">
            Belum ada dukungan yang diberikan kepada kreator
          </Code>
        )}
      </Section>
    </Layout>
  );
}
