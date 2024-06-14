"use client";

import { createDonation } from "@/lib/api/donation";
import { createPayment } from "@/lib/api/payment";
import { createSessionPayment, SessionType } from "@/lib/session";
import { TProfile } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, Input, Button, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

declare global {
  interface Window {
    snap: any;
  }
}

const registrationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().default("orangbaik@gmail.com"),
  gross_amount: z.number().min(5000),
});

export default function Payment({
  profile,
  creator,
  session,
}: {
  profile: TProfile | null;
  creator: any;
  session: SessionType;
}) {
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [gross_amount, setAmount] = useState<number>();
  const [triggerred, setTriggerred] = useState(false);
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = `${process.env.MIDTRANS_CLIENT_KEY}`;
    const script = document.createElement("script");
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { handleSubmit } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  return (
    <Card shadow="none" className="border border-gray-300">
      <CardBody>
        <form
          method="POST"
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(async (d, e) => {
            e?.preventDefault();
          })}>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            name="name"
            labelPlacement="inside"
            className={`${session.isSignedIn ? "hidden" : ""}`}
          />
          <Input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            labelPlacement="inside"
            className={`${session.isSignedIn ? "hidden" : ""}`}
          />
          <Input
            type="number"
            onChange={(e) => setAmount(parseInt(e.target.value))}
            name="gross_amount"
            placeholder="000,00"
            labelPlacement="outside"
            isInvalid={triggerred && !gross_amount}
            errorMessage="Nominal harus diisi"
            value={gross_amount?.toString()}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">IDR</span>
              </div>
            }
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-2">
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
          <Textarea
            maxRows={3}
            onChange={(e) => setMessage(e.target.value)}
            minRows={2}
            placeholder="Masukkan pesan"
            maxLength={125}
          />
          <Button
            isLoading={load}
            type="submit"
            className="bg-purple text-white"
            onClick={async () => {
              setTriggerred(true);

              setLoad(true);
              if (!gross_amount) {
                setLoad(false);
                return;
              }

              const order_id = `${creator.username}-${Math.random()
                .toString(36)
                .slice(2)}`;

              try {
                const res = await createPayment({
                  order_id,
                  gross_amount: gross_amount!,
                  name: name === "" ? "Orang baik" : name,
                  email,
                  item_details: {
                    id: creator.username,
                    name: creator.name,
                    category: creator.category.name,
                    url: `/${creator.username}`,
                    price: gross_amount,
                    quantity: 1,
                  },
                });

                await createSessionPayment(order_id);

                try {
                  await createDonation(
                    {
                      order_id,
                      gross_amount,
                      message,
                      email,
                      name,
                      receiverUsername: creator.username,
                      senderEmail: email,
                      senderName: name,
                    },
                    session
                  );

                  window.snap.pay(res.data.token, {
                    onSuccess: (result: any) => {
                      console.log("success", result);
                      window.location.href = "/payment-status";
                    },
                    onPending: (result: any) => {
                      console.log("pending transaction", result);
                      window.location.href = "/payment-status";
                    },
                    onError: (result: any) => {
                      console.log("error transaction", result);
                      window.location.href = "/payment-status";
                    },
                    onClose: (result: any) => {
                      setLoad(false);
                      window.location.href = "/payment-status";
                    },
                  });
                } catch (error) {
                  console.error(error);
                  toast.error("Gagal melakukan donasi, silahkan coba lagi");
                }
              } catch (error) {
                console.error(error);
                toast.error("Sesuatu terjadi, silahkan coba lagi");
              }
            }}>
            Berikan Dukungan
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
