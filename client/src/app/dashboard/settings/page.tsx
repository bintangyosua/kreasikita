"use server";

import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import { getProfile, getUser, getUserByUsername } from "@/lib/api/users";
import { getSession } from "@/lib/session";
import { Button, Input, Textarea } from "@nextui-org/react";
import ProfileSettings from "./profile";
import Password from "./password";
import { TProfile } from "@/types/profile";
import Header from "./header";

export default async function Page() {
  const session = await getSession();
  let user: TProfile = await getProfile(session.access_token);
  return (
    <Layout page="settings" type="dashboard">
      <Section>
        <div className="flex flex-col gap-3">
          <Header profile={user} session={session} />
          <div className="flex flex-col md:flex-row">
            <ProfileSettings user={user} />
            <Password />
          </div>
        </div>
      </Section>
    </Layout>
  );
}
