"use server";

import HomeLayout from "@/components/layouts/home-layout";
import Payment from "@/components/profile/payment";
import { getProfile, getUserByUsername } from "@/lib/api/users";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { TProfile } from "@/types/profile";
import { getDonationsByProfile } from "@/lib/api/donation";
import { TDonation } from "@/types/types";
import { format } from "date-fns";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await getUserByUsername(params.slug);
  const session = await getSession();
  const donations = await getDonationsByProfile(params.slug);

  if (!user.data) {
    notFound();
  }

  const profile = session.access_token
    ? await getProfile(session.access_token)
    : null;

  return (
    <HomeLayout>
      <main className="flex flex-col md:flex-row gap-6">
        <ProfileSection user={user} profile={profile} session={session} />
        <div className="flex flex-col md:w-2/5 gap-5">
          <Payment session={session} creator={user.data} profile={profile} />
        </div>
      </main>
      <section className="grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {donations.length > 0 &&
          donations.map((value: any, key: any) => (
            <CardMessage2 key={key} donation={value} />
          ))}
      </section>
    </HomeLayout>
  );
}

interface ProfileSectionProps {
  user: any;
  profile: TProfile | null;
  session: any;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  return (
    <div className="border-gray-300 border rounded-3xl w-full">
      <div
        style={{
          backgroundImage: `url('https://cdn.wallpapersafari.com/22/71/Kj7nrU.png')`,
          backgroundPosition: "center",
        }}
        className="h-28 sm:h-32 lg:h-48 w-full rounded-t-3xl"></div>
      <Avatar
        src={`${user.data.pfp}`}
        className="w-28 h-28 rounded-full mx-auto -mt-12"
      />
      <div className="-mt-12 flex justify-between xl:justify-evenly pl-10 pr-2">
        <div className="flex flex-col text-center">
          <span className="font-bold text-3xl">{user.data.name}</span>
          <span className="text-gray-500">@{user.data.username}</span>
        </div>
        <div className="flex flex-col">
          <a href={`/category/${user.data.category.name.toLowerCase()}`}>
            <Button
              className="rounded-full w-full bg-purple text-md text-white px-4 py-1"
              size="sm">
              {user.data.category.name}
            </Button>
          </a>
          {/* <span>345.000 Supporters</span> */}
        </div>
      </div>
      <p className="text-center mt-5 p-3 md:w-2/3 mx-auto">
        {user.data.description ? user.data.description : "No description"}
      </p>
    </div>
  );
};

function CardMessage2({ donation }: { donation: TDonation }) {
  return (
    <Card className="w-full p-0 border border-gray-300" shadow="none">
      <CardHeader className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Avatar
            alt="Avatar"
            // height={40}
            radius="full"
            src={
              donation.sender.pfp
                ? `${donation.sender.pfp}`
                : "/images/anon.png"
            }
            // width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">
              {donation.senderName ? donation.senderName : "Anonymous"}
            </p>
            <p className="text-small text-default-500">
              @{donation.senderUsername ? donation.senderUsername : "anonymous"}
            </p>
          </div>
        </div>
        <span className="text-sm text-gray-600 text-right">
          {format(donation.transaction_time, "dd MMM yyyy")}
          <br />
          {format(donation.transaction_time, "HH mm")}
        </span>
      </CardHeader>
      <CardBody>
        <p>{donation.message ? donation.message : "No description"}</p>
      </CardBody>
      <Divider />
    </Card>
  );
}
