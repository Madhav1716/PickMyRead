import React, { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Pick My Read" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>PickMyRead</title>
      </Head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
