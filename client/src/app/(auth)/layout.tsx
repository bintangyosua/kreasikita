"use client";

import React from "react";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const access_token = localStorage.getItem("access_token");
  if (access_token) redirect("/dashboard");

  return <>{children}</>;
}
