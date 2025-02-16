import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Match All URLs in a Body of Text
  const puzzle1 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to find all valid URLs (including `http`, `https`, and optional `www`) in a body of text.",
      sample: "Visit https://example.com or http://www.test.net for more info.",
      testCases: {
        create: [
          {
            targetString:
              "Visit https://example.com or http://www.test.net for more info.",
            matches: ["https://example.com", "http://www.test.net"],
          },
          {
            targetString: "Invalid URLs: ftp://example.com, http://invalid",
            matches: [],
          },
          {
            targetString: "Check out https://sub.domain.co.uk/path?query=123",
            matches: ["https://sub.domain.co.uk/path?query=123"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match a Single Date in YYYY-MM-DD Format
  const puzzle2 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match a single date in the format `YYYY-MM-DD`.",
      sample: "2023-10-05",
      testCases: {
        create: [
          {
            targetString: "2023-10-05",
            matches: ["2023-10-05"],
          },
          {
            targetString: "2023-13-01",
            matches: [],
          },
          {
            targetString: "0000-01-01",
            matches: ["0000-01-01"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match All Words with Double Letters in a Body of Text
  const puzzle3 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to find all words that contain at least one pair of double letters (e.g., 'book' has 'oo') in a body of text.",
      sample: "The book was a success, but hello and apple are also examples.",
      testCases: {
        create: [
          {
            targetString:
              "The book was a success, but hello and apple are also examples.",
            matches: ["book", "success", "hello", "apple"],
          },
          {
            targetString: "cat dog tree",
            matches: ["tree"],
          },
          {
            targetString: "The committee addressed the issue.",
            matches: ["committee", "addressed", "issue"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match a Single Valid IPv4 Address
  const puzzle4 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match a single valid IPv4 address.",
      sample: "192.168.1.1",
      testCases: {
        create: [
          {
            targetString: "192.168.1.1",
            matches: ["192.168.1.1"],
          },
          {
            targetString: "256.256.256.256",
            matches: [],
          },
          {
            targetString: "127.0.0.1",
            matches: ["127.0.0.1"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match All Words with Exactly 3 Vowels in a Body of Text
  const puzzle5 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to find all words that contain exactly 3 vowels (a, e, i, o, u) in a body of text.",
      sample: "The beautiful universe is vast.",
      testCases: {
        create: [
          {
            targetString: "The beautiful universe is vast.",
            matches: ["beautiful", "universe"],
          },
          {
            targetString: "cat dog apple",
            matches: [],
          },
          {
            targetString: "Education is important.",
            matches: ["Education", "important"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match a Single Valid 16-Digit Credit Card Number
  const puzzle6 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match a single 16-digit credit card number (groups of 4 digits separated by hyphens or spaces).",
      sample: "1234-5678-9012-3456",
      testCases: {
        create: [
          {
            targetString: "1234-5678-9012-3456",
            matches: ["1234-5678-9012-3456"],
          },
          {
            targetString: "1234 5678 9012 3456",
            matches: ["1234 5678 9012 3456"],
          },
          {
            targetString: "1234567890123456",
            matches: [],
          },
        ],
      },
      type: "match",
    },
  });

  // Match All Words with Alternating Vowels and Consonants in a Body of Text
  const puzzle7 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to find all words where vowels and consonants alternate (starting with either) in a body of text.",
      sample: "banana cat dog elephant",
      testCases: {
        create: [
          {
            targetString: "banana cat dog elephant",
            matches: ["banana", "cat", "dog"],
          },
          {
            targetString: "hello world",
            matches: [],
          },
          {
            targetString: "aesthetic rhythm",
            matches: [],
          },
        ],
      },
      type: "match",
    },
  });

  // Match a Single Valid Time in 24-Hour Format
  const puzzle8 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to match a single valid time in 24-hour format (e.g., `13:45`, `23:59`).",
      sample: "13:45",
      testCases: {
        create: [
          {
            targetString: "13:45",
            matches: ["13:45"],
          },
          {
            targetString: "25:00",
            matches: [],
          },
          {
            targetString: "23:59",
            matches: ["23:59"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match All Words with No Repeated Letters in a Body of Text
  const puzzle9 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to find all words where no letter is repeated in a body of text.",
      sample: "cat dog elephant",
      testCases: {
        create: [
          {
            targetString: "cat dog elephant",
            matches: ["cat", "dog"],
          },
          {
            targetString: "hello world",
            matches: [],
          },
          {
            targetString: "unique abcdef",
            matches: ["abcdef"],
          },
        ],
      },
      type: "match",
    },
  });

  // Match All Valid HTML Tags in a Body of Text
  const puzzle10 = await prisma.puzzle.create({
    data: {
      description:
        "Write a regular expression to find all valid HTML tags (e.g., `<div>`, `<p class='text'>`) in a body of text.",
      sample: "<div> <p class='text'> <img src='image.jpg' />",
      testCases: {
        create: [
          {
            targetString: "<div> <p class='text'> <img src='image.jpg' />",
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
        "Write a string that will be matched by the following regular expression.",
      sample: "/[!@#$%^&*]{2,}/",
      type: "password",
    },
  });

  const puzzle12 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression.",
      sample: "/^\\d.*[a-zA-Z]$/",
      type: "password",
    },
  });

  const puzzle13 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression.",
      sample: "/^(.*\\d){3}.*$/",
      type: "password",
    },
  });

  const puzzle14 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression.",
      sample: "/^(?!.*(.).*\\1).*$/",
      type: "password",
    },
  });

  const puzzle15 = await prisma.puzzle.create({
    data: {
      description:
        "Write a string that will be matched by the following regular expression.",
      sample: "/^(?=.*[a-z])(?=.*[A-Z]).+$/",
      type: "password",
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
