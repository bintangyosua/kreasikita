import React from "react";

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl w-full lg:w-3/3 xl:1/2 mx-auto gap-5 flex flex-col">
      {children}
    </section>
  );
}
