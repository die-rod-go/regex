import { prisma } from "@/app/lib/db";

// GET /api/dataset/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } | undefined }
) {
  const puzzle = await prisma.puzzle.findUnique({
    where: { id: params?.id },
    include: { testCases: true },
  });

  //  if not found
  if (!puzzle) {
    return Response.json(
      { error: "Specified puzzle not found" },
      { status: 404 }
    );
  }

  return Response.json(puzzle);
}
