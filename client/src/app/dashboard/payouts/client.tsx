"use client";

import { createPayout } from "@/lib/api/payout";
import { SessionType } from "@/lib/session";
import { TCreatePayout } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const requestPayoutSchema = z.object({
  bank_code: z.string().min(3),
  card_number: z
    .string()
    .min(4)
    .regex(new RegExp("^[0-9]+$"), "Expected number"),
  amount: z.number().min(20000),
  description: z.string().optional(),
  timecreated: z.string().datetime().default(new Date().toISOString()),
});

export default function Client({
  banks,
  session,
}: {
  banks: { data: { bank_code: string; bank_name: string }[] };
  session: SessionType;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(requestPayoutSchema),
  });

  return (
    <form
      className="flex sm:grid sm:grid-cols-3 md:grid-cols-3 flex-col md:flex-row items-center gap-3"
      method="POST"
      onSubmit={handleSubmit(async (d, e) => {
        e?.preventDefault();
        setLoading(true);

        try {
          console.log("masuk sini");
          const res = await createPayout(
            session.access_token,
            d as TCreatePayout
          );
          console.log({ res });
          if (res.statusCode === 400) {
            toast.error("Saldo tidak mencukupi");
            setLoading(false);
            return;
          }
          toast.success("Pengajuan payout sedang diproses");
          setLoading(false);
          router.refresh();
        } catch (error) {
          toast.error("Failed to request payout");
          setLoading(false);
        }
      })}>
      {banks.data && banks.data.length > 0 ? (
        <Select
          {...register("bank_code")}
          variant="bordered"
          name="bank_code"
          placeholder="Pilih Bank"
          className="min-w-full md:min-w-0 md:max-w-full"
          isInvalid={errors.bank_code ? true : false}
          errorMessage={errors.bank_code?.message?.toString()}
          defaultSelectedKeys={["bca"]}>
          {banks.data.map((animal) => (
            <SelectItem key={animal.bank_code} value={animal.bank_code}>
              {animal.bank_name}
            </SelectItem>
          ))}
        </Select>
      ) : (
        <>Hello</>
      )}
      <Input
        {...register("card_number")}
        type="text"
        variant="bordered"
        name="card_number"
        labelPlacement="outside"
        isInvalid={errors.card_number ? true : false}
        errorMessage={errors.card_number?.message?.toString()}
        startContent={
          <div className="pointer-events-none flex items-center min-w-24">
            <span className="text-default-400 text-small">Card Number</span>
          </div>
        }
      />

      <Input
        {...register("amount", {
          valueAsNumber: true,
        })}
        type="number"
        name="amount"
        variant="bordered"
        placeholder="000,00"
        labelPlacement="outside"
        className="min-w-full md:min-w-20"
        isInvalid={errors.amount ? true : false}
        errorMessage={errors.amount?.message?.toString()}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">IDR</span>
          </div>
        }
      />

      <Input
        {...register("description")}
        type="string"
        variant="bordered"
        name="description"
        placeholder="Short description here"
        labelPlacement="outside"
        className="col-span-2"
        isInvalid={errors.description ? true : false}
        errorMessage={errors.description?.message?.toString()}
      />
      <Button
        type="submit"
        className="bg-purple text-white min-w-full md:min-w-20"
        isLoading={loading}>
        Payout
      </Button>
    </form>
  );
}
