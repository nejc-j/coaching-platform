-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "updated_at" DATETIME NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_users" ("age", "created_at", "description", "email", "firstName", "fitnessGoal", "gender", "id", "imageUrl", "lastName", "location", "password", "role", "updated_at") SELECT "age", "created_at", "description", "email", "firstName", "fitnessGoal", "gender", "id", "imageUrl", "lastName", "location", "password", "role", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
