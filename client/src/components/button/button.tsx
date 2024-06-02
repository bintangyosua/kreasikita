import React from "react";
import { ButtonProps } from "../ui/button";

export default function Button({
  name,
  ...props
}: {
  name: string;
  props: ButtonProps;
}) {
  return (
    <button
      className="flex gap-1 items-center bg-purple px-5 py-3 rounded-full text-white"
      {...props}>
      <span>{name}</span>
    </button>
  );
}
