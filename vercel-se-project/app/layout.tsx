import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { get } from "@vercel/edge-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hacker News Reader",
  description: "A modern Hacker News reader built with Next.js",
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-50">
          <Navigation copyrightYear={await get("copyrightYear")} />
          <main className="flex-1 ml-64">{children}</main>
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
