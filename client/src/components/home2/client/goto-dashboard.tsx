"use client";

import { Button } from "@nextui-org/react";
import React, { useState } from "react";

export default function GoToDashboard({ isSignedIn }: { isSignedIn: boolean }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {!isSignedIn ? (
        <a href="/signup">
          <Button
            className="bg-purple text-white"
            name="Mulai Halaman Ku"
            isLoading={loading}
            onClick={() => setLoading(true)}>
            Mulai Halaman Ku
          </Button>
        </a>
      ) : (
        <a href="/dashboard">
          <Button
            className="bg-purple text-white"
            name="Pergi ke Dashboard"
            isLoading={loading}
            onClick={() => setLoading(true)}>
            Pergi ke Dashboard
          </Button>
        </a>
      )}
    </>
  );
}
