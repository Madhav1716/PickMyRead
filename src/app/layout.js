import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";

export const metadata = { title: "Pick My Read" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>PickMyRead</title>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
