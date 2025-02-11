import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create some puzzles
  const puzzle1 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match all words that start with 'a'.",
      sample: "apple banana apricot orange avocado",
      testCases: {
        create: [
          {
            targetString: "apple banana apricot orange avocado",
            matches: ["apple", "apricot", "avocado"],
          },
          {
            targetString: "antelope zebra aardvark",
            matches: ["antelope", "aardvark"],
          },
          { targetString: "hello world", matches: [] },
        ],
      },
      type: "match",
    },
  });

  const puzzle2 = await prisma.puzzle.create({
    data: {
      description: "Find all 3-digit numbers.",
      sample: "My number is 123, not 45 or 6789.",
      testCases: {
        create: [
          { targetString: "Call 911 for emergencies.", matches: ["911"] },
          {
            targetString: "The codes are 007, 404, and 500.",
            matches: ["404", "500"],
          },
          { targetString: "One two three", matches: [] },
          {
            targetString: "My number is 123, not 45 or 6789.",
            matches: ["123"],
          },
        ],
      },
      type: "match",
    },
  });

  const puzzle3 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be caught by the following regular expression",
      sample: "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$",
      type: "password",
    },
  });

  // Set today's daily puzzle (2/10/25)
  await prisma.dailyPuzzle.create({
    data: {
      date: new Date("2025-02-11"),
      puzzleId: puzzle1.id,
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
