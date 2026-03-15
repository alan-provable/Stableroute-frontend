import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StableRoute — Liquidity Router",
  description: "Stablecoin liquidity routing on Stellar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
