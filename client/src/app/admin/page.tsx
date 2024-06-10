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
import { getAllDonations } from "@/lib/api/donation";
import { getSession } from "@/lib/session";
import DonationsTable from "./data-table";
import { Code } from "@nextui-org/react";

export default async function Page() {
  const session = await getSession();

  const donations = await getAllDonations(session.access_token);

  return (
    <Layout page="home" type="admin">
      <Section>
        {donations.data && donations.data.length > 0 ? (
          <DonationsTable donations={donations.data} />
        ) : (
          <Code color="danger" className="h-10 flex items-center">
            Belum ada dukungan yang diberikan kepada kreator
          </Code>
        )}
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
