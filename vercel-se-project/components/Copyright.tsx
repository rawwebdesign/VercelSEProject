import React from "react";
import { get } from "@vercel/edge-config";
import { Suspense } from "react";

export default async function Copyright() {
  return (
    <Suspense>
      <footer className="w-full bg-gray-100 p-4 text-center text-gray-600 text-sm mt-8">
        <p>
          &copy; {(await get("copyrightYear")) || "2025"} Brad Spencer. All
          rights reserved.
        </p>
      </footer>
    </Suspense>
  );
}
