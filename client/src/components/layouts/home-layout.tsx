import React from "react";
import Navbar from "../home2/navbar";
import Footer from "../home2/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
