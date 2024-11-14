/*
  Warnings:

  - You are about to drop the column `availability` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundImageUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sport` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `users` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "coaches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "availability" INTEGER NOT NULL DEFAULT 0,
    "rating" REAL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    CONSTRAINT "coaches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "slotCalendars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "coachId" TEXT NOT NULL,
    CONSTRAINT "slotCalendars_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    CONSTRAINT "slots_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "slots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_slots" ("coachId", "dateTime", "duration", "id", "status", "userId") SELECT "coachId", "dateTime", "duration", "id", "status", "userId" FROM "slots";
DROP TABLE "slots";
ALTER TABLE "new_slots" RENAME TO "slots";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "fitnessGoal" TEXT,
    "imageUrl" TEXT,
    "location" TEXT,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("created_at", "description", "email", "id", "location", "password", "role", "updated_at") SELECT "created_at", "description", "email", "id", "location", "password", "role", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "coaches_userId_key" ON "coaches"("userId");
