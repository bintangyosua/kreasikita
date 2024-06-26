import React from "react";

export default function KreasiKita({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 67 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.9392 0V10.5675L39.3109 0H66.3636V5.49508L36.352 30.4343L66.3636 56.2189V60.8685H39.3109L24.9392 51.1465V60.8685H0V39.7336C-1.28997e-05 31.2797 8.45395 32.9705 17.7533 39.7336L40.1563 55.3735H57.9096L28.3208 30.4343L57.9096 5.49508H40.1563L17.7533 21.9803C5.49506 31.0005 0 27.4754 0 21.9803V0H24.9392Z"
        fill={color}
      />
      <path
        d="M20.2895 4.64966H4.22699V20.7122C4.227 23.7313 7.93373 23.5189 13.6998 19.3257L20.2895 14.2939V4.64966Z"
        fill="white"
      />
      <path
        d="M4.22699 42.3881V56.6415H20.2895V47.7649L14.3717 43.5379C8.45397 38.8882 4.22699 38.195 4.22699 42.3881Z"
        fill="white"
      />
    </svg>
  );
}
