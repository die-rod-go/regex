"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CheatSheet from "./components/cheat_sheet";
import { useState } from "react";
import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { getRandomPuzzle } from "./lib/puzzles";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const toggleCheatSheet = () => {
    setIsCheatSheetOpen(!isCheatSheetOpen);
  };

  function fetchRandomPuzzle() {
    const loadPuzzle = async () => {
      const puzzle = await getRandomPuzzle();
      router.push(`/puzzle/${puzzle.id}`);
    };
    loadPuzzle();
  }

  return (
    <html lang="en">
      <body className="flex bg-bg-primary">
        {/* random puzzle button */}
        <button
          onClick={fetchRandomPuzzle}
          className={`m-2 fixed top-8 transition-all duration-300 ease-in-out text-text-secondary rounded-md py-2 px-4 hover:bg-bg-input outline-none focus:outline-accent flex items-center justify-center gap-2 ${
            isCheatSheetOpen ? "left-[30%]" : "left-8"
          }`}
        >
          <ArrowPathIcon className="w-6 h-6" />
          Random Puzzle
        </button>
        {/* sidebar / CheatSheet */}
        <div
          className={`transition-all duration-300 ease-in-out fixed top-0 left-0 h-full bg-bg-secondary text-text-muted p-4 ${
            isCheatSheetOpen ? "w-[30%]" : "w-0 opacity-0"
          } overflow-hidden`}
        >
          <CheatSheet />
        </div>
        {/* button to toggle CheatSheet */}

        <button
          onClick={toggleCheatSheet}
          className={`w-20 h-20 m-2 fixed top-1/2 -translate-y-1/2 transform p-3 z-50  text-accent transition-all duration-300 ease-in-out rounded-full hover:bg-bg-input ${
            isCheatSheetOpen ? "left-[30%]" : "left-0"
          }`}
        >
          {isCheatSheetOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>

        {/* main content */}
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
