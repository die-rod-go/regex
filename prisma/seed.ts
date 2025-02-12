import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Match All URLs
  const puzzle1 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match valid URLs (including `http`, `https`, and optional `www`).",
      sample:
        "https://example.com http://www.test.net www.google.com invalid-url",
      testCases: {
        create: [
          {
            targetString:
              "https://example.com http://www.test.net www.google.com invalid-url",
            matches: [
              "https://example.com",
              "http://www.test.net",
              "www.google.com",
            ],
          },
          {
            targetString: "ftp://example.com http://invalid",
            matches: [],
          },
          {
            targetString: "https://sub.domain.co.uk/path?query=123",
            matches: ["https://sub.domain.co.uk/path?query=123"],
          },
          {
            targetString: "www.example.com",
            matches: ["www.example.com"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match Dates in YYYY-MM-DD Format
  const puzzle2 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match dates in the format `YYYY-MM-DD`.",
      sample: "2023-10-05 1999-12-31 2025-02-30 invalid-date 2023/10/05",
      testCases: {
        create: [
          {
            targetString:
              "2023-10-05 1999-12-31 2025-02-28 invalid-date 2023/10/05",
            matches: ["2023-10-05", "1999-12-31", "2025-02-28"],
          },
          {
            targetString: "2023-13-01 2023-00-01 2023-01-32",
            matches: [],
          },
          {
            targetString: "0000-01-01 9999-12-31",
            matches: ["0000-01-01", "9999-12-31"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match Words with Double Letters
  const puzzle3 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match words that contain at least one pair of double letters (e.g., 'book' has 'oo').",
      sample: "book success hello apple banana",
      testCases: {
        create: [
          {
            targetString: "book success hello apple banana",
            matches: ["book", "success", "hello", "apple"],
          },
          {
            targetString: "cat dog tree",
            matches: [],
          },
          {
            targetString: "committee address",
            matches: ["committee", "address"],
          },
          {
            targetString: "mississippi",
            matches: ["mississippi"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match Valid IP Addresses
  const puzzle4 = await prisma.puzzle.create({
    data: {
      description: "Write a regular expression to match valid IPv4 addresses.",
      sample: "192.168.1.1 256.256.256.256 127.0.0.1 0.0.0.0",
      testCases: {
        create: [
          {
            targetString: "192.168.1.1 256.256.256.256 127.0.0.1 0.0.0.0",
            matches: ["192.168.1.1", "127.0.0.1", "0.0.0.0"],
          },
          {
            targetString: "999.999.999.999 1.2.3.4.5",
            matches: [],
          },
          {
            targetString: "10.0.0.1 255.255.255.255",
            matches: ["10.0.0.1", "255.255.255.255"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match Words with Exactly 3 Vowels
  const puzzle5 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match words that contain exactly 3 vowels (a, e, i, o, u).",
      sample: "beautiful hello universe python",
      testCases: {
        create: [
          {
            targetString: "beautiful hello universe python",
            matches: ["beautiful", "universe"],
          },
          {
            targetString: "cat dog apple",
            matches: [],
          },
          {
            targetString: "education",
            matches: ["education"],
          },
          {
            targetString: "queueing",
            matches: [],
          },
        ],
      },
      type: "match",
    },
  });

  // Match Valid Credit Card Numbers (16 Digits)
  const puzzle6 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match 16-digit credit card numbers (groups of 4 digits separated by hyphens or spaces).",
      sample:
        "1234-5678-9012-3456 1234 5678 9012 3456 1234567890123456 invalid",
      testCases: {
        create: [
          {
            targetString:
              "1234-5678-9012-3456 1234 5678 9012 3456 1234567890123456 invalid",
            matches: ["1234-5678-9012-3456", "1234 5678 9012 3456"],
          },
          {
            targetString: "1234-5678-9012-345 123456789012345",
            matches: [],
          },
          {
            targetString: "0000-0000-0000-0000 9999-9999-9999-9999",
            matches: ["0000-0000-0000-0000", "9999-9999-9999-9999"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match Words with Alternating Vowels and Consonants
  const puzzle7 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match words where vowels and consonants alternate (starting with either).",
      sample: "apple banana cat dog elephant",
      testCases: {
        create: [
          {
            targetString: "apple banana cat dog elephant",
            matches: ["banana", "cat", "dog"],
          },
          {
            targetString: "hello world",
            matches: [],
          },
          {
            targetString: "aesthetic",
            matches: ["aesthetic"],
          },
          {
            targetString: "rhythm",
            matches: [],
          },
        ],
      },
      type: "match",
    },
  });

  // Match Valid Time in 24-Hour Format
  const puzzle8 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match valid times in 24-hour format (e.g., `13:45`, `23:59`).",
      sample: "13:45 25:00 23:59 00:00 12:60",
      testCases: {
        create: [
          {
            targetString: "13:45 25:00 23:59 00:00 12:60",
            matches: ["13:45", "23:59", "00:00"],
          },
          {
            targetString: "24:00 12:99",
            matches: [],
          },
          {
            targetString: "01:01 19:19",
            matches: ["01:01", "19:19"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match Words with No Repeated Letters
  const puzzle9 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match words where no letter is repeated.",
      sample: "apple banana cat dog elephant",
      testCases: {
        create: [
          {
            targetString: "apple banana cat dog elephant",
            matches: ["cat", "dog"],
          },
          {
            targetString: "hello world",
            matches: [],
          },
          {
            targetString: "unique",
            matches: ["unique"],
          },
          {
            targetString: "abcdef",
            matches: ["abcdef"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match Valid HTML Tags
  const puzzle10 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match valid HTML tags (e.g., `<div>`, `<p class='text'>`).",
      sample: "<div> <p class='text'> <img src='image.jpg' /> <invalid>",
      testCases: {
        create: [
          {
            targetString:
              "<div> <p class='text'> <img src='image.jpg' /> <invalid>",
            matches: ["<div>", "<p class='text'>", "<img src='image.jpg' />"],
          },
          {
            targetString: "<> </> <a>",
            matches: ["<a>"],
          },
          {
            targetString: "<input type='text' />",
            matches: ["<input type='text' />"],
          },
        ],
      },
      type: "match",
    },
  });

  // Password Puzzles
  const puzzle11 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression: At least 2 special characters.",
      sample: "P@ssw0rd!@",
      type: "password",
    },
  });

  const puzzle12 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression: Starts with a digit and ends with a letter.",
      sample: "1passwordA",
      type: "password",
    },
  });

  const puzzle13 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression: Contains exactly 3 digits.",
      sample: "Pass123word",
      type: "password",
    },
  });

  const puzzle14 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression: No repeated characters.",
      sample: "Un1queP@ss",
      type: "password",
    },
  });

  const puzzle15 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression: Contains at least one uppercase and one lowercase letter.",
      sample: "Passw0rd",
      type: "password",
    },
  });

  // // Assign Daily Puzzles
  // await prisma.dailyPuzzle.upsert({
  //   where: { date: new Date("2025-02-11") },
  //   update: {},
  //   create: {
  //     date: new Date("2025-02-11"),
  //     puzzleId: puzzle1.id,
  //   },
  // });

  // await prisma.dailyPuzzle.upsert({
  //   where: { date: new Date("2025-02-12") },
  //   update: {},
  //   create: {
  //     date: new Date("2025-02-12"),
  //     puzzleId: puzzle2.id,
  //   },
  // });

  // await prisma.dailyPuzzle.upsert({
  //   where: { date: new Date("2025-02-13") },
  //   update: {},
  //   create: {
  //     date: new Date("2025-02-13"),
  //     puzzleId: puzzle3.id,
  //   },
  // });

  // await prisma.dailyPuzzle.upsert({
  //   where: { date: new Date("2025-02-14") },
  //   update: {},
  //   create: {
  //     date: new Date("2025-02-14"),
  //     puzzleId: puzzle4.id,
  //   },
  // });

  // await prisma.dailyPuzzle.upsert({
  //   where: { date: new Date("2025-02-15") },
  //   update: {},
  //   create: {
  //     date: new Date("2025-02-15"),
  //     puzzleId: puzzle5.id,
  //   },
  // });

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
