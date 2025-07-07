import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Copyright from "@/components/Copyright";

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
          <Navigation />
          <div className="flex-1 flex flex-col ml-64">
            <main className="flex-1">{children}</main>
            <Copyright />
          </div>
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
