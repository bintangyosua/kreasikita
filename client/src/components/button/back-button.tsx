"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button className="bg-purple text-white" onClick={() => router.back()}>
      <IoMdArrowRoundBack size={20} /> Back
    </Button>
  );
}
