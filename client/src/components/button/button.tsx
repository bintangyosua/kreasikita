import React from "react";

export default function Button({ name }: { name: string }) {
  return (
    <button className="flex gap-1 items-center bg-purple px-5 py-3 rounded-full text-white">
      <span>{name}</span>
    </button>
  );
}
