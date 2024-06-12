"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";

export default function Client({
  banks,
}: {
  banks: { data: { bank_code: string; bank_name: string }[] };
}) {
  return (
    <div className="flex sm:grid sm:grid-cols-2  md:flex flex-col md:flex-row items-center gap-3">
      {banks.data && banks.data.length > 0 ? (
        <Select
          variant="bordered"
          placeholder="Pilih Bank"
          // label="Bank"
          className="min-w-full md:min-w-0 md:max-w-32"
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
        // onChange={(e) => setAmount(parseInt(e.target.value))}
        name="gross_amount"
        variant="bordered"
        placeholder="000,00"
        labelPlacement="outside"
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
        type="number"
        variant="bordered"
        // onChange={(e) => setAmount(parseInt(e.target.value))}
        name="gross_amount"
        placeholder="000,00"
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
      <Button className="bg-purple text-white min-w-full md:min-w-20">
        Payout
      </Button>
    </div>
  );
}
