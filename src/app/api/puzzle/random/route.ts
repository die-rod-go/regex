import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/db";
import { GET as getPuzzleById } from "../[id]/route";

export async function GET(req: NextRequest) {
  // get total count of puzzles
  const puzzleCount = await prisma.puzzle.count();

  // get a random puzzle id
  const randomPuzzle = await prisma.puzzle.findFirst({
    select: { id: true },
    take: 1,
    skip: Math.floor(Math.random() * puzzleCount),
  });

  // if no puzzles exist
  if (!randomPuzzle) {
    return Response.json(
      { error: "No puzzles found in the database." },
      { status: 404 }
    );
  }

  // route through [id] handler
  const response = await getPuzzleById(req, {
    params: Promise.resolve({ id: randomPuzzle.id }),
  });
  const puzzleData = await response.json();

  return Response.json({ browseType: "random", ...puzzleData });
}
