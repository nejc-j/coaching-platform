/*
  Warnings:

  - You are about to drop the `Coach` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Coach";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "coaches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "rating" REAL,
    "backgroundImageUrl" TEXT,
    "availability" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    CONSTRAINT "coaches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "slots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'FREE',
    "coachId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "slots_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "slots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
