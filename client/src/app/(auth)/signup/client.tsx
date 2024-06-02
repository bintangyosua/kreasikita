"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { postUser } from "@/lib/api/users";
import { toast } from "react-toastify";
import { navigate } from "./actions";
import { signIn } from "@/lib/api/auth";
import { setSession } from "@/lib/session";

const registrationSchema = z.object({
  name: z.string().min(5),
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Client({
  categories,
}: {
  categories: {
    id: number;
    name: string;
  }[];
}) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const [categoryId, setCategoryId] = useState<number | string>();

  const [isVisible, setIsVisible] = React.useState<any>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form
      className="grid place-items-center w-full h-full"
      onSubmit={handleSubmit(async (d) => {
        const { class: _, ...newUser } = d;
        const res = await postUser(newUser, Number(categoryId));

        if (res.status === 201) {
          toast.success(res.message);
          const { access_token } = await signIn(
            getValues("email"),
            getValues("password")
          );

          await setSession(access_token);
          navigate();
        }
      })}>
      <div className="flex flex-col gap-4 w-full justify-between px-5 max-w-[400px] mt-16">
        <h1 className="text-3xl sm:text-4xl mb-6 font-bold text-center">
          Selamat Datang
        </h1>
        <Input
          {...register("name")}
          type="text"
          variant={"underlined"}
          label="Name"
          name="name"
          placeholder="Enter your name"
        />

        {errors.root?.message && (
          <p className="text-red-500">{errors.root?.message}</p>
        )}

        <Input
          {...register("username")}
          type="text"
          variant={"underlined"}
          label="Username"
          name="username"
          placeholder="Enter your username"
        />
        <Input
          {...register("email")}
          type="email"
          variant={"underlined"}
          label="Email"
          name="email"
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
        {/* <Input
          {...register("confirmPassword")}
          label="Confirm Password"
          variant="underlined"
          fullWidth
          width={"100%"}
          name="confirmPassword"
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
        /> */}
        <Autocomplete
          {...register("categoryId")}
          label="Kategori"
          isRequired
          placeholder="Choose category"
          variant="underlined"
          // onChange={(value) => setCategoryId(value)}
          value={getValues("categoryId")}
          onSelectionChange={(id) => {
            setCategoryId(id);
          }}
          defaultItems={categories}
          selectedKey={categoryId}
          name="categoryId">
          {categories &&
            categories.map((value) => (
              <AutocompleteItem key={value.id}>{value.name}</AutocompleteItem>
            ))}
        </Autocomplete>

        <span className="text-sm text-gray-500">
          Sudah memiliki Akun? Masuk di{" "}
          <a
            href="/signin"
            className="text-purple font-bold hover:text-indigo-300">
            sini
          </a>
        </span>
        <Button type="submit" className="bg-purple text-white">
          Button
        </Button>
      </div>
    </form>
  );
}
