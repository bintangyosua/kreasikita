import React from "react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-6 text-lg text-center sm:text-left gap-3 mt-10 border-t-[1px] mx-3">
      <div className="">© Kreasi Kita</div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-4">
        <Link href="/tentang-kami" name="Tentang Kami" />
        <Link href="/help-center" name="Help Center" />
        <Link href="/privasi" name="Privasi" />
        <Link href="/aturan" name="Aturan" />
      </div>
      <div className="flex flex-row gap-2">
        <a href="#">
          <FaXTwitter size={25} />
        </a>
        <a href="#">
          <FaYoutube size={25} />
        </a>
        <a href="#">
          <FaInstagram size={25} />
        </a>
      </div>
    </div>
  );
}

function Link({ href, name }: { href: string; name: string }) {
  return <a href={href}>{name}</a>;
}
