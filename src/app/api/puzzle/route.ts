import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    // parse the request body
    const body = await req.json();
    const { puzzleId, solution } = body;

    // validate input
    if (!puzzleId || !solution) {
      return NextResponse.json(
        { error: "Puzzle ID and solution are required" },
        { status: 400 }
      );
    }

    // find the puzzle and associated test cases
    const puzzle = await prisma.puzzle.findUnique({
      where: { id: puzzleId },
      include: { testCases: true },
    });

    if (!puzzle) {
      return NextResponse.json({ error: "Puzzle not found" }, { status: 404 });
    }

    // attempt to create a regex from the solution
    let regex;
    try {
      regex = new RegExp(solution, "g");
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid regular expression" },
        { status: 400 }
      );
    }

    // evaluate the regex against each test case
    const results = puzzle.testCases.map((testCase) => {
      //  convert from json to string then to array to appease typescript
      const expectedMatches = JSON.parse(JSON.stringify(testCase.matches));
      //  see what the user solution matches in the target string
      const actualMatches = testCase.targetString.match(regex) || [];
      return {
        targetString: testCase.targetString,
        expectedMatches,
        actualMatches,
        correct:
          //  true if both match
          JSON.stringify(expectedMatches.sort()) ===
          JSON.stringify(actualMatches.sort()),
      };
    });

    // determine if all test cases passed
    const allCorrect = results.every((result) => result.correct);

    return NextResponse.json({
      correct: allCorrect,
      results,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
