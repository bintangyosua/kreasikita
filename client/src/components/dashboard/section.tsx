import React from "react";

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl px-5 py-8 w-full lg:w-2/3 xl:1/2 mx-auto gap-5 flex flex-col">
      {children}
    </section>
  );
}
