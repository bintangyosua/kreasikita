"use client";

import { updateUserByUsername } from "@/lib/api/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const profileSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(8),
});

export default function Profile({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  return (
    <form
      className="md:w-1/2"
      onSubmit={handleSubmit(async (d) => {
        setLoading(true);

        try {
          const res = await updateUserByUsername({
            name: d.name,
            description: d.description,
          });

          toast.success("Berhasil mengubah profile");
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      })}>
      <div className="p-5 gap-3 grid grid-cols-1 sm:grid-cols-3">
        <Input
          {...register("name")}
          type="text"
          label="Name"
          name="name"
          labelPlacement="outside"
          variant="underlined"
          size="sm"
          defaultValue={user.name}
          isInvalid={errors.name ? true : false}
          errorMessage={errors.name?.message?.toString()}
        />
        <Input
          labelPlacement="outside"
          type="text"
          label="Username"
          variant="underlined"
          size="sm"
          value={user.username}
          disabled
        />
        <Input
          type="email"
          label="Email"
          labelPlacement="outside"
          variant="underlined"
          size="sm"
          value={user.email}
          disabled
        />
      </div>
      <div className="p-5 pt-0 flex flex-col gap-3">
        <Textarea
          {...register("description")}
          label="Description"
          labelPlacement="outside"
          variant="underlined"
          name="description"
          size="sm"
          defaultValue={user.description}
          isInvalid={errors.description ? true : false}
          errorMessage={errors.description?.message?.toString()}
        />
        <Button
          size="md"
          className="bg-purple text-white w-full"
          type="submit"
          isLoading={loading}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
