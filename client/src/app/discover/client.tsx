"use client";

import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

export default function Client({ users }: { users: any }) {
  console.log({ users });
  return (
    <>
      {users.length > 0 ? (
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-3 lg:gap-5 xl:gap-10">
          {users.length > 0 &&
            users.map((value: any, key: any) => (
              <CardLayout
                key={key}
                name={value.name}
                username={value.username}
                profileImg={value.pfp}
                shortDesc={value.description}
              />
            ))}
        </section>
      ) : (
        <Callout.Root color="red" className="w-full">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>Belum ada kreator pada kata kunci ini </Callout.Text>
        </Callout.Root>
      )}
    </>
  );
}

function CardLayout({
  name,
  bannerImg,
  profileImg,
  username,
  shortDesc,
}: {
  name?: string;
  bannerImg?: string;
  profileImg?: string;
  username?: string;
  shortDesc?: string;
}) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader
        style={{
          height: "80px",
          backgroundImage: `url('https://cdn.wallpapersafari.com/22/71/Kj7nrU.png')`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}></CardHeader>
      <CardHeader className="flex gap-3">
        <Avatar
          alt="nextui logo"
          // height={60}
          radius="full"
          size="md"
          src={profileImg}
          // width={60}
        />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-small text-default-500">@{username}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>
          {shortDesc
            ? shortDesc.slice(0, 70) + "..."
            : `Tanpa deskripsi`.slice(0, 70)}
        </p>
      </CardBody>
      <Divider />
      <CardFooter>
        <a href={`/${username}`} className="text-purple">
          Lihat Profile
        </a>
      </CardFooter>
    </Card>
  );
}
