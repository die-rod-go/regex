import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  //    get a random puzzle
  const puzzle = await prisma.puzzle.findFirst({
    orderBy: { id: "asc" },
    take: 1,
    skip: Math.floor(Math.random() * (await prisma.puzzle.count())), // skip a random number of records
  });

  //    if no puzzles exist
  if (!puzzle) {
    return Response.json(
      { error: "No puzzles found in the database." },
      { status: 404 }
    );
  }

  return Response.json({ browseType: "random", ...puzzle });
}
