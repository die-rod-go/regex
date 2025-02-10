/*
  Warnings:

  - You are about to drop the column `matched` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `pattern` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `previewLength` on the `Puzzle` table. All the data in the column will be lost.
  - Added the required column `sample` to the `Puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "targetString" TEXT NOT NULL,
    "matches" JSONB NOT NULL,
    "puzzleId" TEXT NOT NULL,
    CONSTRAINT "TestCase_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "sample" TEXT NOT NULL
);
INSERT INTO "new_Puzzle" ("description", "id") SELECT "description", "id" FROM "Puzzle";
DROP TABLE "Puzzle";
ALTER TABLE "new_Puzzle" RENAME TO "Puzzle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "TestCase_puzzleId_key" ON "TestCase"("puzzleId");
