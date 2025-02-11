import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { JsonValue } from "@prisma/client/runtime/library";

type Puzzle = {
  id: string;
  description: string;
  sample: string;
  type: string;
  testCases: {
    id: string;
    targetString: string;
    matches: JsonValue;
    puzzleId: string;
  }[];
};

//  submit solution to puzzle
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { puzzleId, solution } = body;

    if (!puzzleId || !solution) {
      return NextResponse.json(
        { error: "Puzzle ID and solution are required" },
        { status: 400 }
      );
    }

    const puzzle = await prisma.puzzle.findUnique({
      where: { id: puzzleId },
      include: { testCases: true },
    });

    if (!puzzle) {
      return NextResponse.json({ error: "Puzzle not found" }, { status: 404 });
    }

    if (puzzle.type === "match") {
      return handleMatchPuzzle(puzzle, solution);
    } else if (puzzle.type === "password") {
      return handlePasswordPuzzle(puzzle, solution);
    } else {
      return NextResponse.json(
        { error: "Unknown puzzle type" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function handleMatchPuzzle(puzzle: Puzzle, solution: string) {
  let regex;
  try {
    regex = new RegExp(solution, "g");
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid regular expression" },
      { status: 400 }
    );
  }

  const results = puzzle.testCases.map((testCase) => {
    const expectedMatches = JSON.parse(JSON.stringify(testCase.matches));
    const actualMatches = testCase.targetString.match(regex) || [];
    return {
      targetString: testCase.targetString,
      expectedMatches,
      actualMatches,
      correct:
        JSON.stringify(expectedMatches.sort()) ===
        JSON.stringify(actualMatches.sort()),
    };
  });

  const allCorrect = results.every((result) => result.correct);

  return NextResponse.json({
    correct: allCorrect,
    results,
  });
}

function handlePasswordPuzzle(puzzle: Puzzle, solution: string) {
  let regex;
  try {
    regex = new RegExp(puzzle.sample);
  } catch (error) {
    return NextResponse.json(
      { error: "Error with puzzle. Contact Diego" },
      { status: 400 }
    );
  }

  const correct = regex.test(solution);

  return NextResponse.json({
    correct,
  });
}
