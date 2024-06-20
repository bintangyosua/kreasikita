import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KreasiKita",
  description: "Website untuk support konten kreator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="shortcut icon" href="/icon.svg" type="image/x-icon" />
      </head>
      <body className={poppins.className}>
        <ToastContainer position="top-center" />
        <Theme>
          {/* <NextUIProvider>{children}</NextUIProvider> */}
          {children}
        </Theme>
      </body>
    </html>
  );
}
