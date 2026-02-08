import type { Metadata } from "next";
import "./globals.css";
import ScrollController from "@/components/ScrollController";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Product Space | University of Illinois",
  description: "Product Space at the University of Illinois",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/background.png" as="image" />
      </head>
      <body className="min-h-screen antialiased font-sans bg-[#e5e3e0] text-black">
        <svg aria-hidden="true" className="absolute w-0 h-0 overflow-hidden">
          <defs>
            <filter id="text-inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
<feOffset in="SourceAlpha" dx="0.8" dy="0.8" result="offset" />
            <feGaussianBlur in="offset" stdDeviation="0.6" result="blur" />
            <feComposite in="SourceAlpha" in2="blur" operator="in" result="inner" />
            <feFlood floodColor="rgba(0,0,0,0.5)" result="flood" />
              <feComposite in="flood" in2="inner" operator="in" result="shadow" />
              <feComposite in="shadow" in2="SourceGraphic" operator="over" result="out" />
            </filter>
          </defs>
        </svg>
        <LoadingScreen />
        <ScrollController />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
