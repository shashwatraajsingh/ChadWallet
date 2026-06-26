import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import TokenMarquee from "@/components/TokenMarquee";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChadWallet - Trading App",
  description: "Next gen Solana trading application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark font-aeonik bg-bg-primary text-text-primary`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <TokenMarquee />
          {children}
          <TokenMarquee />
        </Providers>
      </body>
    </html>
  );
}
