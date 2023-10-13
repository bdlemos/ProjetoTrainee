/*
  Warnings:

  - You are about to drop the `_SongListeners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SongListeners";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_SongToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SongToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SongToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_SongToUser_AB_unique" ON "_SongToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SongToUser_B_index" ON "_SongToUser"("B");
