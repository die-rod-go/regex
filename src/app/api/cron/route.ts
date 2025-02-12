import { prisma } from "@/app/lib/db";
import { NextRequest } from "next/server";

//  set daily puzzle
export async function POST(req: NextRequest) {
  //  get a random puzzle
  const randomPuzzle = await prisma.puzzle.findFirst({
    orderBy: { id: "asc" },
    take: 1,
    skip: Math.floor(Math.random() * (await prisma.puzzle.count())), // skip a random number of records
  });

  if (!randomPuzzle) {
    return Response.json(
      { error: "No puzzles found in the database." },
      { status: 404 }
    );
  }

  //  check if the puzzle has already been used as the daily puzzle before
  const existingDailyPuzzle = await prisma.dailyPuzzle.findFirst({
    where: {
      puzzleId: randomPuzzle.id,
    },
  });

  if (existingDailyPuzzle) {
    return Response.json(
      { error: "This puzzle has already been used for today." },
      { status: 400 }
    );
  }

  // If not used, create the daily puzzle entry
  const newDailyPuzzle = await prisma.dailyPuzzle.create({
    data: {
      date: new Date(),
      puzzleId: randomPuzzle.id,
    },
  });

  return Response.json(newDailyPuzzle);
}
