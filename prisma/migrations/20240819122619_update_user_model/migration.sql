/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `coaches` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_slots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'FREE',
    "coachId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "slots_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "slots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_slots" ("coachId", "dateTime", "duration", "id", "status", "userId") SELECT "coachId", "dateTime", "duration", "id", "status", "userId" FROM "slots";
DROP TABLE "slots";
ALTER TABLE "new_slots" RENAME TO "slots";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "coaches_userId_key" ON "coaches"("userId");
