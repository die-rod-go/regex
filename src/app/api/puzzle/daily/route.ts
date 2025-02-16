import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/db";
import { GET as getPuzzleById } from "../[id]/route";

export async function GET(req: NextRequest) {
  // get today's date
  const today = new Date().toISOString().split("T")[0];

  // find daily puzzle id
  const dailyPuzzleEntry = await prisma.dailyPuzzle.findFirst({
    where: { date: new Date(today) },
  });

  // if not found
  if (!dailyPuzzleEntry) {
    return Response.json(
      { error: "No puzzle found for today." },
      { status: 404 }
    );
  }

  // route through [id] handler
  const response = await getPuzzleById(req, {
    params: Promise.resolve({ id: dailyPuzzleEntry.puzzleId }),
  });
  const puzzleData = await response.json();

  return Response.json({ browseType: "daily", ...puzzleData });
}
