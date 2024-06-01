import Navbar from "@/components/auth/navbar";
import React from "react";
import Client from "./client";

export default function Page() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col">
      <Navbar />
      <div>
        <Client />
      </div>
    </div>
  );
}
