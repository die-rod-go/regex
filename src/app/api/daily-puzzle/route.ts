import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  //  get today's date
  const today = new Date().toISOString().split("T")[0];

  //  find daily puzzle id
  const dailyPuzzleEntry = await prisma.dailyPuzzle.findFirst({
    where: { date: new Date(today) },
  });

  //  if not found
  if (!dailyPuzzleEntry) {
    return Response.json(
      { error: "No puzzle found for today." },
      { status: 404 }
    );
  }

  //  get puzzle details based off id
  const puzzle = await prisma.puzzle.findFirst({
    where: { id: dailyPuzzleEntry.puzzleId },
  });

  //  if not found
  if (!puzzle) {
    return Response.json(
      { error: "Specified puzzle not found" },
      { status: 404 }
    );
  }

  return Response.json({ browseType: "daily", ...puzzle });
}
