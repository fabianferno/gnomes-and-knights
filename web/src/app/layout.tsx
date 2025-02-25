import type { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "@/components/Providers";

const inter = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Gnomes&Knights",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[url('/assets/ui/clouds.png')]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
