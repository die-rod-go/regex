/*
  Warnings:

  - You are about to drop the column `date` on the `Puzzle` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "DailyPuzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "puzzleId" TEXT NOT NULL,
    CONSTRAINT "DailyPuzzle_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "matched" TEXT NOT NULL
);
INSERT INTO "new_Puzzle" ("description", "id", "matched", "pattern") SELECT "description", "id", "matched", "pattern" FROM "Puzzle";
DROP TABLE "Puzzle";
ALTER TABLE "new_Puzzle" RENAME TO "Puzzle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "DailyPuzzle_date_key" ON "DailyPuzzle"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyPuzzle_puzzleId_key" ON "DailyPuzzle"("puzzleId");
