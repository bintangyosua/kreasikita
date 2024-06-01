"use client";

import { SessionType } from "@/lib/session";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import React, { useState } from "react";

export default function Payment({ session }: { session: SessionType }) {
  const [amount, setAmount] = useState<number>();
  return (
    <>
      <Card shadow="none" className="border border-gray-300">
        <CardBody className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Nama"
            labelPlacement="inside"
            className={`${session.isSignedIn ? "hidden" : ""}`}
          />
          <Input
            type="text"
            placeholder="Email"
            labelPlacement="inside"
            className={`${session.isSignedIn ? "hidden" : ""}`}
          />
          <Input
            type="number"
            placeholder="000,00"
            onChange={(value) => setAmount(parseInt(value.target.value))}
            labelPlacement="outside"
            value={amount?.toString()}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">IDR</span>
              </div>
            }
          />
          <div className="grid grid-cols-4 gap-2">
            <Button
              size="sm"
              className="bg-gray-300"
              onClick={() => setAmount(10000)}>
              10k
            </Button>
            <Button size="sm" onClick={() => setAmount(25000)}>
              25k
            </Button>
            <Button size="sm" onClick={() => setAmount(50000)}>
              50k
            </Button>
            <Button size="sm" onClick={() => setAmount(100000)}>
              100k
            </Button>
          </div>
          <Button className="bg-purple text-white">Berikan Dukungan</Button>
        </CardBody>
      </Card>
    </>
  );
}
