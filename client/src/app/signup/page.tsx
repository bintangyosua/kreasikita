"use client";

import Navbar from "@/components/auth/navbar";
import { Button, Input } from "@nextui-org/react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React from "react";
import { CiMail } from "react-icons/ci";

export default function Page() {
  const [isVisible, setIsVisible] = React.useState(false);

  // const [user, setUser]

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="container mx-auto min-h-screen flex flex-col">
      <Navbar />
      <div className="grid place-items-center w-full h-full">
        <div className="flex flex-col gap-4 w-full justify-between px-5 max-w-[400px] mt-16">
          <h1 className="text-3xl sm:text-4xl mb-6 font-bold text-center">
            Selamat Datang
          </h1>
          <Input
            type="text"
            variant={"underlined"}
            label="Name"
            placeholder="Enter your name"
          />
          <Input
            type="text"
            variant={"underlined"}
            label="Username"
            placeholder="Enter your username"
          />
          <Input
            type="email"
            variant={"underlined"}
            label="Email"
            placeholder="Enter your email"
            startContent={<CiMail />}
          />
          <Input
            label="Password"
            variant="underlined"
            fullWidth
            width={"100%"}
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeOpenIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-full"
          />

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            variant="underlined"
            fullWidth
            width={"100%"}
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeOpenIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-full"
          />

          <span className="text-sm text-gray-500">
            Sudah memiliki Akun? Masuk di{" "}
            <a
              href="/signin"
              className="text-purple font-bold hover:text-indigo-300">
              sini
            </a>
          </span>
          <Button className="bg-purple text-white">Button</Button>
        </div>
      </div>
    </div>
  );
}
