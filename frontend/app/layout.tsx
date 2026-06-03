import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

// @ts-expect-error:allow side-effect css import without type declarations
import "./globals.css";

const geistSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BizOps",
  description: "Inventory Control Operation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}  antialiased flex min-h-screen`}>{children}</body>
    </html>
  );
}
