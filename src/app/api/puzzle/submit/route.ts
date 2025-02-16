import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { puzzleType, description, sampleText, testCases } = body;

    // Validate required fields
    if (!puzzleType || !description || !sampleText) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the puzzle with its test cases
    const puzzle = await prisma.puzzle.create({
      data: {
        type: puzzleType,
        description: description,
        sample: sampleText,
        testCases: {
          create: testCases.map((testCase: any) => ({
            targetString: testCase.targetString,
            matches: testCase.matches, // This is already JSON compatible from the frontend
          })),
        },
      },
      include: {
        testCases: true,
      },
    });

    return NextResponse.json(puzzle, { status: 201 });
  } catch (error) {
    console.error("Failed to create puzzle:", error);
    return NextResponse.json(
      { error: "Failed to create puzzle" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
