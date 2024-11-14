-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coach" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "backgroundImageUrl" TEXT,
    CONSTRAINT "Coach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coach" ("backgroundImageUrl", "description", "id", "location", "name", "rating", "sport", "userId") SELECT "backgroundImageUrl", "description", "id", "location", "name", "rating", "sport", "userId" FROM "Coach";
DROP TABLE "Coach";
ALTER TABLE "new_Coach" RENAME TO "Coach";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
