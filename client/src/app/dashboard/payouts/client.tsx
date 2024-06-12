"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import * as z from "zod";

const requestPayoutSchema = z.object({
  bank_code: z.string().min(3),
  amount: z.number().min(20000),
  card_number: z.number().min(4),
});

export default function Client({
  banks,
}: {
  banks: { data: { bank_code: string; bank_name: string }[] };
}) {
  return (
    <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 flex-col md:flex-row items-center gap-3">
      {banks.data && banks.data.length > 0 ? (
        <Select
          variant="bordered"
          placeholder="Pilih Bank"
          // label="Bank"
          className="min-w-full md:min-w-0 md:max-w-full"
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
        type="number"
        variant="bordered"
        // onChange={(e) => setAmount(parseInt(e.target.value))}
        name="card_number"
        min={10000}
        labelPlacement="outside"
        // isInvalid={triggerred && !gross_amount}
        // errorMessage="Nominal harus diisi"
        // value={gross_amount?.toString()}
        startContent={
          <div className="pointer-events-none flex items-center min-w-24">
            <span className="text-default-400 text-small">Card Number</span>
          </div>
        }
      />
      <Input
        type="number"
        // onChange={(e) => setAmount(parseInt(e.target.value))}
        name="gross_amount"
        variant="bordered"
        placeholder="000,00"
        labelPlacement="outside"
        className="min-w-full md:min-w-20"
        // isInvalid={triggerred && !gross_amount}
        // errorMessage="Nominal harus diisi"
        // value={gross_amount?.toString()}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">IDR</span>
          </div>
        }
      />

      <Input
        type="string"
        variant="bordered"
        // onChange={(e) => setAmount(parseInt(e.target.value))}
        name="description"
        placeholder="Short description here"
        labelPlacement="outside"
        className="col-span-2"
        // isInvalid={triggerred && !gross_amount}
        // errorMessage="Nominal harus diisi"
        // value={gross_amount?.toString()}
      />
      <Button className="bg-purple text-white min-w-full md:min-w-20">
        Payout
      </Button>
    </div>
  );
}
