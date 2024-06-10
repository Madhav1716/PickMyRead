import React, { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Adsense from "./components/Adsense";

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
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <Adsense />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
