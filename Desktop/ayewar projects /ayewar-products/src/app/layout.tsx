import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ئایەوار | بەرهەمەکانمان",
  description:
    "بەرهەمە داهێنەرانەکانی ئایەوار بۆ فێربوونی شەتڕەنج، گەشتکردن، و ژیانی خوێندکاری لە کوردستان.",
  keywords: [
    "ئایەوار",
    "شەتڕەنج",
    "ChessIFY",
    "Raiders",
    "Students",
    "Zidobid",
    "کوردستان",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ckb" dir="rtl">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
