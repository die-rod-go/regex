"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CheatSheet from "./components/cheat_sheet";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Regexpert",
//   description: "A regular expression puzzle game.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  const toggleCheatSheet = () => {
    setIsCheatSheetOpen(!isCheatSheetOpen);
  };

  return (
    <html lang="en">
      <body className="flex">
        {/* sidebar / CheatSheet */}
        <div
          className={`transition-all duration-300 ease-in-out fixed top-0 left-0 h-full bg-gray-800 text-white p-4 ${
            isCheatSheetOpen ? "w-[30%]" : "w-0 opacity-0"
          } overflow-hidden`}
        >
          <CheatSheet />
        </div>
        {/* button to toggle CheatSheet */}

        <button
          onClick={toggleCheatSheet}
          className={`w-20 h-20 fixed top-1/2 transform -translate-y-1/2 p-3 z-50  text-blue-500 transition-all duration-300 ease-in-out ${
            isCheatSheetOpen ? "left-[31%]" : "left-0"
          }`}
        >
          {isCheatSheetOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>

        {/* main Content */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isCheatSheetOpen ? "ml-[30%]" : "ml-0"
          } w-full`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
