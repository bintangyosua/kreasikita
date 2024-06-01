"use client";

import React from "react";

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
