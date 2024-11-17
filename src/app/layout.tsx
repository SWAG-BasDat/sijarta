'use client'

import localFont from "next/font/local";
import "./globals.css";
import Nav from "../components/Nav";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <Nav />
          </div>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
