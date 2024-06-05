import React, { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
// import AdSense from "./components/AdSense";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pick My Read",
  description:
    "Discover your next great read! Pick My Read offers a curated selection of books in various categories.",
  // ... other metadata properties
};

export default function RootLayout({ children }) {
  const { title = "Pick My Read", description } = metadata;

  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
      {/* <AdSense pId="（Adsense@ID）" /> */}
    </html>
  );
}
