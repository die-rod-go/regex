import { prisma } from "@/app/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const puzzle = await prisma.puzzle.findUnique({
    where: { id },
    include: { testCases: true },
  });

  // if not found
  if (!puzzle) {
    return Response.json(
      { error: "Specified puzzle not found" },
      { status: 404 }
    );
  }

  return Response.json(puzzle);
}
