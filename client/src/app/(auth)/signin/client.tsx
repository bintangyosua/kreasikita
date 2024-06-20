"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input } from "@nextui-org/react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { toast } from "react-toastify";
import { navigate } from "./actions";
import { signIn } from "@/lib/api/auth";
import { setSession } from "@/lib/session";
import { access } from "fs";

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Client() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const [isVisible, setIsVisible] = React.useState<any>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form
      className="grid place-items-center w-full h-full"
      onSubmit={handleSubmit(async (d) => {
        setLoading(true);
        const { access_token } = await signIn(d.email, d.password);

        if (!access_token) {
          toast.error("Password yang anda masukkan salah");
          setLoading(false);
        } else {
          await setSession(access_token);
          toast.success("Berhasil sign in");
          navigate();
        }
      })}>
      <div className="flex flex-col gap-4 w-full justify-between px-5 max-w-[400px] mt-16">
        <h1 className="text-3xl sm:text-4xl mb-6 font-bold text-center">
          Selamat Datang
        </h1>
        <Input
          {...register("email")}
          type="email"
          variant={"underlined"}
          label="Email"
          name="email"
          isInvalid={errors.email ? true : false}
          errorMessage={errors.email?.message?.toString()}
          placeholder="Enter your email"
          startContent={<CiMail />}
        />
        <Input
          {...register("password")}
          label="Password"
          variant="underlined"
          fullWidth
          width={"100%"}
          name="password"
          isInvalid={errors.password ? true : false}
          errorMessage={errors.password?.message?.toString()}
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
          Belum memiliki Akun? Daftar di{" "}
          <a
            href="/signup"
            className="text-purple font-bold hover:text-indigo-300">
            sini
          </a>
        </span>
        <Button
          type="submit"
          className="bg-purple text-white"
          isLoading={loading}>
          Sign In
        </Button>
      </div>
    </form>
  );
}
