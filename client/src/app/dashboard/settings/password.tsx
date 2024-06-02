"use client";

import { changePassword } from "@/lib/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const passwordSchema = z.object({
  password: z.string().min(5),
  confirmPassword: z.string().min(5),
});

export default function Password() {
  const [loading, setLoading] = useState(false);
  const [samePass, setSamePass] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (password !== confirmPassword) {
      setSamePass(true);
    }

    if (password === confirmPassword) {
      setSamePass(false);
    }
  }, [password, confirmPassword]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });
  return (
    <form
      method="POST"
      className="flex flex-col gap-5 p-5 md:w-1/2"
      onSubmit={handleSubmit(async (d, e) => {
        e?.preventDefault();
        setLoading(true);

        if (d.password !== d.confirmPassword) {
          setSamePass(true);
          setLoading(false);
          return;
        }

        try {
          const res = await changePassword(d.password);
          toast.success("Password changed successfully");
          setLoading(false);
        } catch (error) {
          toast.error(error?.toString());
          setLoading(false);
        }
      })}>
      <div className="flex flex-col gap-3">
        <Input
          {...register("password")}
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          label="New Password"
          labelPlacement="outside"
          variant="underlined"
          errorMessage={
            errors.password?.message?.toString() ||
            (samePass ? "Passwords do not match" : "")
          }
          isInvalid={!!errors.password || samePass}
          size="sm"
        />
        <Input
          {...register("confirmPassword")}
          type="password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm New Password"
          labelPlacement="outside"
          variant="underlined"
          errorMessage={
            errors.confirmPassword?.message?.toString() ||
            (samePass ? "Passwords do not match" : "")
          }
          isInvalid={!!errors.confirmPassword || samePass}
          size="sm"
        />
      </div>
      <Button
        size="md"
        className="bg-purple text-white"
        type="submit"
        isLoading={loading}>
        Save Changes
      </Button>
    </form>
  );
}
