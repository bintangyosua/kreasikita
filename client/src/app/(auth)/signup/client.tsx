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
  name: z.string().min(4, "Name must be at least 4 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const [loading, setLoading] = useState(false);

  const [categoryId, setCategoryId] = useState<number | string>();
  const [clicked, setClicked] = useState(false);

  const [isVisible, setIsVisible] = React.useState<any>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="grid place-items-center w-full h-full">
      <form
        className="flex flex-col gap-4 w-full justify-between px-5 max-w-[400px] mt-16"
        onSubmit={handleSubmit(async (d) => {
          setClicked(true);
          setLoading(true);
          if (!categoryId) {
            return setLoading(false);
          }
          const { class: _, ...newUser } = d;
          const res = await postUser(newUser, categoryId);
          console.log({ res });

          if (res.statusCode === 400) {
            toast.error(res.message);
            setClicked(false);
            setLoading(false);
            return;
          }

          if (res.status === 201) {
            toast.success(res.message);
            const { access_token } = await signIn(
              getValues("email"),
              getValues("password")
            );

            await setSession(access_token);
            navigate();
          } else {
            toast.error("Password yang anda masukkan salah");
            setClicked(false);
            setLoading(false);
          }
        })}>
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
          isInvalid={errors.name?.message ? true : false}
          errorMessage={errors.name?.message?.toString()}
        />

        <Input
          {...register("username")}
          type="text"
          variant={"underlined"}
          label="Username"
          name="username"
          placeholder="Enter your username"
          isInvalid={errors.username?.message ? true : false}
          errorMessage={errors.username?.message?.toString()}
        />
        <Input
          {...register("email")}
          type="email"
          variant={"underlined"}
          label="Email"
          name="email"
          placeholder="Enter your email"
          startContent={<CiMail />}
          isInvalid={errors.email?.message ? true : false}
          errorMessage={errors.email?.message?.toString()}
        />
        <Input
          {...register("password")}
          label="Password"
          variant="underlined"
          fullWidth
          width={"100%"}
          name="password"
          placeholder="Enter your password"
          isInvalid={errors.password?.message ? true : false}
          errorMessage={errors.password?.message?.toString()}
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

        <Autocomplete
          {...register("categoryId")}
          label="Kategori"
          isRequired
          placeholder="Choose category"
          variant="underlined"
          defaultSelectedKey={categoryId}
          isInvalid={categoryId ? false : true && clicked}
          errorMessage={"Category must be selected"}
          onSelectionChange={(id) => {
            setCategoryId(id);
          }}
          defaultItems={categories}
          value={categoryId}
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
        <Button
          type="submit"
          className="bg-purple text-white"
          isLoading={loading}>
          Daftar
        </Button>
      </form>
    </div>
  );
}
