import { prisma } from "@/app/lib/db";
import { NextRequest } from "next/server";

//  set daily puzzle
export async function POST(req: NextRequest) {
  console.log("Assigning new Daily Puzzle");
  //  get a random puzzle
  const randomPuzzle = await prisma.puzzle.findFirst({
    orderBy: { id: "asc" },
    take: 1,
    skip: Math.floor(Math.random() * (await prisma.puzzle.count())), // skip a random number of records
  });

  console.log("Random puzzle found:", randomPuzzle);

  if (!randomPuzzle) {
    return Response.json(
      { error: "No puzzles found in the database." },
      { status: 404 }
    );
  }

  //  check if the puzzle has already been used as the daily puzzle before and return an error if it has
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

  //  isolate date part of datetime
  const today = new Date().toISOString().split("T")[0];

  //  delete daily puzzle if one already exists for today (makes it easy to manually reseed puzzle)
  try {
    const deletedDaily = await prisma.dailyPuzzle.delete({
      where: {
        date: new Date(today),
      },
    });
  } catch (error) {
    console.log("No daily puzzle found for today");
  }

  //  create the daily puzzle entry
  const newDailyPuzzle = await prisma.dailyPuzzle.create({
    data: {
      date: new Date(today),
      puzzleId: randomPuzzle.id,
    },
  });

  console.log("New daily puzzle created:", newDailyPuzzle);

  return Response.json(newDailyPuzzle);
}
