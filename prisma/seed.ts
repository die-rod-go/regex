import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Matching Puzzles
  const puzzle1 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match all words that start with a vowel.",
      sample: "apple orange banana umbrella igloo eagle cat dog",
      testCases: {
        create: [
          {
            targetString: "apple orange banana umbrella igloo eagle cat dog",
            matches: ["apple", "orange", "umbrella", "igloo", "eagle"],
          },
          { targetString: "cat dog", matches: [] },
          {
            targetString: "elephant ostrich",
            matches: ["elephant", "ostrich"],
          },
        ],
      },
      type: "match",
    },
  });

  const puzzle2 = await prisma.puzzle.create({
    data: {
      description: "Write a regular expression to match all 4-letter words.",
      sample: "This is a test code blue tree data",
      testCases: {
        create: [
          {
            targetString: "This is a test code blue tree data",
            matches: ["test", "code", "blue", "tree", "data"],
          },
          { targetString: "I love cats.", matches: [] },
        ],
      },
      type: "match",
    },
  });

  const puzzle3 = await prisma.puzzle.create({
    data: {
      description: "Write a regular expression to match valid email addresses.",
      sample: "test@example.com hello@world.net invalid-email@ address.com",
      testCases: {
        create: [
          {
            targetString:
              "test@example.com hello@world.net invalid-email@ address.com",
            matches: ["test@example.com", "hello@world.net"],
          },
          { targetString: "invalid-email@", matches: [] },
          { targetString: "user@domain.com", matches: ["user@domain.com"] },
        ],
      },
      type: "match",
    },
  });

  const puzzle4 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match any word containing 'cat'.",
      sample: "The cat caught the catastrophe in the catalog.",
      testCases: {
        create: [
          {
            targetString: "The cat caught the catastrophe in the catalog.",
            matches: ["cat", "caught", "catastrophe", "catalog"],
          },
          { targetString: "dog", matches: [] },
        ],
      },
      type: "match",
    },
  });

  const puzzle5 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match all words containing digits.",
      sample: "I have 2 apples, 10 oranges, and 3 bananas.",
      testCases: {
        create: [
          {
            targetString: "I have 2 apples, 10 oranges, and 3 bananas.",
            matches: ["2", "10", "3"],
          },
          { targetString: "apples oranges bananas", matches: [] },
        ],
      },
      type: "match",
    },
  });

  const puzzle6 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match valid phone numbers in the format (123) 456-7890.",
      sample: "(123) 456-7890 (987) 654-3210 123-456-7890",
      testCases: {
        create: [
          {
            targetString: "(123) 456-7890 (987) 654-3210 123-456-7890",
            matches: ["(123) 456-7890", "(987) 654-3210"],
          },
          { targetString: "123-456-7890", matches: [] },
        ],
      },
      type: "match",
    },
  });

  const puzzle7 = await prisma.puzzle.create({
    data: {
      description: "Write a regular expression to match hex color codes.",
      sample: "#ff5733 #33cc99 #abc #123abc",
      testCases: {
        create: [
          {
            targetString: "#ff5733 #33cc99 #abc #123abc",
            matches: ["#ff5733", "#33cc99", "#123abc"],
          },
          { targetString: "not a color", matches: [] },
        ],
      },
      type: "match",
    },
  });

  const puzzle8 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match strings that contain 'hello' at the start.",
      sample: "hello world, hello again, hi there",
      testCases: {
        create: [
          {
            targetString: "hello world, hello again, hi there",
            matches: ["hello world", "hello again"],
          },
          { targetString: "hi there", matches: [] },
        ],
      },
      type: "match",
    },
  });

  const puzzle9 = await prisma.puzzle.create({
    data: {
      description: "Write a regular expression to match all 5-letter strings.",
      sample: "apple grapes mango banana",
      testCases: {
        create: [
          {
            targetString: "apple grapes mango banana",
            matches: ["apple"],
          },
          { targetString: "cat dog", matches: [] },
        ],
      },
      type: "match",
    },
  });

  const puzzle10 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match words that end with 'ing'.",
      sample: "I am running and jumping in the park.",
      testCases: {
        create: [
          {
            targetString: "I am running and jumping in the park.",
            matches: ["running", "jumping"],
          },
          { targetString: "cat dog", matches: [] },
        ],
      },
      type: "match",
    },
  });

  // Password Puzzles
  const puzzle11 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression",
      sample: `^(?=(.*\\d.*){3})[A-Za-z\\d!@#$%^&*()_+={}\\[\\]|\\\\:;"'<>,.?/-]{8,}$`,
      type: "password",
    },
  });

  const puzzle12 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression",
      sample: `^[A-Z]{1}[a-z]{2,}$`,
      type: "password",
    },
  });

  const puzzle13 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression",
      sample: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$`,
      type: "password",
    },
  });

  const puzzle14 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression",
      sample: `^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).{6,}$`,
      type: "password",
    },
  });

  const puzzle15 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression",
      sample: `^(?=.*[A-Za-z])(?=.*[0-9]).{10,}$`,
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
