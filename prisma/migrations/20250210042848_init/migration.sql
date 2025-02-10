/*
  Warnings:

  - Added the required column `previewLength` to the `Puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "matched" TEXT NOT NULL,
    "previewLength" INTEGER NOT NULL
);
INSERT INTO "new_Puzzle" ("description", "id", "matched", "pattern") SELECT "description", "id", "matched", "pattern" FROM "Puzzle";
DROP TABLE "Puzzle";
ALTER TABLE "new_Puzzle" RENAME TO "Puzzle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
