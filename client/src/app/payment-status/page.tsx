"use server";

import { getPaymentStatus } from "@/lib/api/payment";
import {
  getSession,
  getSessionPayment,
  PaymentSessionType,
} from "@/lib/session";
import { CopyIcon } from "@radix-ui/react-icons";
import { Badge, Code, DataList, Flex, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FaCheck, FaClock, FaDiagramSuccessor } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

interface Status {
  icon: React.ReactNode;
  status: string;
  message: string;
  short: string;
  color: "jade" | "red" | "gray";
}

interface Statuses {
  [key: string]: Status;
}

const statuses: Statuses = {
  capture: {
    icon: <FaCheck size={60} color="green" />,
    status: "Captured",
    message: "Your order has been sent",
    short: "successful",
    color: "jade",
  },
  settlement: {
    icon: <FaCheck size={60} color="green" />,
    status: "Captured",
    message: "Your order has been sent",
    short: "successful",
    color: "jade",
  },
  pending: {
    icon: <FaClock size={60} color="gray" />,
    status: "Pending",
    message: "The transaction is created and is waiting to be paid.",
    short: "pending",
    color: "gray",
  },
  deny: {
    icon: <MdCancel size={60} color="red" />,
    status: "Denied",
    message: "The transaction was denied for some reason.",
    short: "failed",
    color: "red",
  },
  cancel: {
    icon: <MdCancel size={60} color="red" />,
    status: "Cancelled",
    message: "The transaction was cancelled",
    short: "failed",
    color: "red",
  },
  expire: {
    icon: <MdCancel size={60} color="red" />,
    status: "Expired",
    message: "The transaction was expired",
    short: "failed",
    color: "red",
  },
};

export default async function PaymentStatusPage() {
  const payment = await getSessionPayment();

  if (!payment.order_id) {
    return renderNoPaymentMade();
  }

  console.log({ payment: payment.order_id });
  const paymentStatus = await getPaymentStatus(payment.order_id);

  if (!paymentStatus || paymentStatus.status_code === "404") {
    console.log({ paymentStatus });
    return renderNoPaymentMade();
  }

  return renderPaymentSuccessful(paymentStatus, payment);
}

function renderNoPaymentMade() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 md:p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <CircleCheckIcon className="h-12 w-12 text-red-500" />
        <h1 className="font-semibold text-3xl">No payment made yet</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/tight dark:text-gray-400">
          Please order first and then come back later.
        </p>
      </div>
    </div>
  );
}

function renderPaymentSuccessful(
  paymentStatus: any,
  payment: PaymentSessionType
) {
  const {
    icon: StatusIcon,
    status,
    message,
    short,
    color,
  } = statuses[paymentStatus.transaction_status];

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div className="flex flex-col items-center -mt-20 justify-center min-h-screen gap-4 p-4 md:p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        {StatusIcon}
        <h1 className="font-semibold text-3xl">Payment {short}</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/tight dark:text-gray-400">
          {message}
        </p>
      </div>
      <DataList.Root>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Status</DataList.Label>
          <DataList.Value>
            <Badge color={color} variant="soft" radius="full">
              {status}
            </Badge>
          </DataList.Value>
        </DataList.Item>
        {/* {payment.name && (
          <DataList.Item>
            <DataList.Label minWidth="88px">Nama</DataList.Label>
            <DataList.Value>{payment.name}</DataList.Value>
          </DataList.Item>
        )}
        {payment.email && (
          <DataList.Item>
            <DataList.Label minWidth="88px">Email</DataList.Label>
            <DataList.Value>{payment.email}</DataList.Value>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.Label minWidth="88px">Order Id</DataList.Label>
          <DataList.Value>{paymentStatus.order_id}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Nama Kreator</DataList.Label>
          <DataList.Value>{payment.creator_username}</DataList.Value>
        </DataList.Item> */}
        <DataList.Item>
          <DataList.Label minWidth="88px">Nominal Dukungan</DataList.Label>
          <DataList.Value>
            {formatter.format(paymentStatus.gross_amount)}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Metode Pembayaran</DataList.Label>
          <DataList.Value>
            {paymentStatus.payment_type}{" "}
            {paymentStatus.acquirer ? " - " + paymentStatus.acquirer : ""}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Waktu Transaksi</DataList.Label>
          <DataList.Value>{paymentStatus.transaction_time}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Expired</DataList.Label>
          <DataList.Value>{paymentStatus.expiry_time}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </div>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
