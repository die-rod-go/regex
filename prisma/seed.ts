import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const puzzle = await prisma.puzzle.create({
    data: {
      description: 'Match a simple word with "cat" in it.',
      pattern: "The cat sat on the mat.",
      matched: "cat",
      previewLength: 15,
    },
  });

  await prisma.dailyPuzzle.create({
    data: {
      date: new Date("2025-02-10T00:00:00Z"),
      puzzleId: puzzle.id,
    },
  });

  console.log("Test data created!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
