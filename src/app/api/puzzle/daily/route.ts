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

  try {
    // route through [id] handler
    const response = await getPuzzleById(req, {
      params: Promise.resolve({ id: dailyPuzzleEntry.puzzleId }),
    });

    if (!response.ok) {
      // If the puzzle ID handler returned an error, forward it
      return response;
    }

    const puzzleData = await response.json();

    if (!puzzleData) {
      return Response.json(
        { error: "Failed to load puzzle data" },
        { status: 500 }
      );
    }

    return Response.json({ browseType: "daily", ...puzzleData });
  } catch (error) {
    console.error("Error fetching puzzle:", error);
    return Response.json({ error: "Failed to load puzzle" }, { status: 500 });
  }
}
