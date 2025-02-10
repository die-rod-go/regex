import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET(req: NextRequest, res: NextResponse) {
  //  Get today's date
  const today = new Date().toISOString().split("T")[0];

  //  Find daily puzzle id
  const dailyPuzzleEntry = await prisma.dailyPuzzle.findFirst({
    where: { date: new Date(today) },
  });

  console.log(dailyPuzzleEntry);

  if (!dailyPuzzleEntry) {
    return Response.json(
      { error: "No puzzle found for today." },
      { status: 404 }
    );
  }

  //  Get puzzle details based off id
  const puzzle = await prisma.puzzle.findFirst({
    where: { id: dailyPuzzleEntry.puzzleId },
  });

  if (!puzzle) {
    return Response.json(
      { error: "Specified puzzle not found" },
      { status: 404 }
    );
  }

  return Response.json(puzzle);
}
