/*
  Warnings:

  - You are about to drop the `coaches` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "coaches";
PRAGMA foreign_keys=on;

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
    CONSTRAINT "slots_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "slots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_slots" ("coachId", "dateTime", "duration", "id", "status", "userId") SELECT "coachId", "dateTime", "duration", "id", "status", "userId" FROM "slots";
DROP TABLE "slots";
ALTER TABLE "new_slots" RENAME TO "slots";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "email" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "sport" TEXT,
    "location" TEXT,
    "rating" REAL,
    "backgroundImageUrl" TEXT,
    "availability" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_users" ("created_at", "email", "id", "name", "password", "updated_at", "verificationToken", "verified") SELECT "created_at", "email", "id", "name", "password", "updated_at", "verificationToken", "verified" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_verificationToken_key" ON "users"("verificationToken");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
