"use server";

import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import { getProfile, getUser, getUserByUsername } from "@/lib/api/users";
import { getSession } from "@/lib/session";
import { Button, Input, Textarea } from "@nextui-org/react";
import ProfileSettings from "./profile";
import Password from "./password";

export default async function Page() {
  const session = await getSession();
  let user = await getProfile(session.access_token);
  return (
    <Layout page="settings">
      <Section>
        <div className="flex flex-col gap-3">
          <div
            style={{
              backgroundColor: "#5CCCC6",
              backgroundImage: `url('https://t4.ftcdn.net/jpg/04/04/73/39/360_F_404733910_2mIXr6RbC5G3WZJFjopVsBaR3EOM6Bqy.jpg')`,
              backgroundPosition: "center",
            }}
            className="h-28 sm:h-32 lg:h-48 w-full rounded-t-3xl"></div>
          <div className="flex items-center justify-start px-5">
            <div>
              <div
                style={{
                  backgroundColor: "#5B5BD6",
                  backgroundImage: `url('https://i.pinimg.com/236x/8d/9f/09/8d9f095f1c59bba933ce67c7cf7fe508.jpg')`,
                  backgroundPosition: "center",
                }}
                className="w-28 h-28 rounded-full ml-16 -mt-12"></div>
            </div>
            <div className="-mt-4 justify-between w-full pl-10 pr-2 hidden sm:flex"></div>
          </div>

          <div className="flex flex-col md:flex-row">
            <ProfileSettings user={user} />
            <Password />
          </div>
        </div>
      </Section>
    </Layout>
  );
}
