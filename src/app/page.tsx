"use client";

import { getTodaysPuzzle } from "./lib/puzzles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const loadPuzzle = async () => {
      const puzzle = await getTodaysPuzzle();
      router.push(`/puzzle/${puzzle.id}`);
    };

    loadPuzzle();
  }, []);

  return null;
}
