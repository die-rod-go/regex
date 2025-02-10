import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    //  Parse the request body
    const body = await req.json();

    //  Validate input
    const { puzzleId, solution } = body;

    if (!puzzleId || !solution) {
      return NextResponse.json(
        { error: "Puzzle ID and solution are required" },
        { status: 400 }
      );
    }

    //  Find the puzzle
    const puzzle = await prisma.puzzle.findUnique({
      where: { id: puzzleId },
    });

    //  Check if puzzle exists
    if (!puzzle) {
      return NextResponse.json({ error: "Puzzle not found" }, { status: 404 });
    }

    //  Create a RegExp from the solution
    let regex;
    try {
      regex = new RegExp(solution);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid regular expression" },
        { status: 400 }
      );
    }

    //  Test the solution against the puzzle's pattern
    const matches = regex.test(puzzle.pattern);
    const isCorrect = matches && puzzle.matched === solution;

    return NextResponse.json({
      correct: isCorrect,
      matches: matches,
      expectedMatch: puzzle.matched,
      providedSolution: solution,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
