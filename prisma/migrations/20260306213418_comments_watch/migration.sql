/*
  Warnings:

  - You are about to drop the column `episodeId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `serieId` on the `Comment` table. All the data in the column will be lost.
  - Made the column `postId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_serieId_fkey";

-- DropIndex
DROP INDEX "Comment_episodeId_idx";

-- DropIndex
DROP INDEX "Comment_seasonId_idx";

-- DropIndex
DROP INDEX "Comment_serieId_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "episodeId",
DROP COLUMN "seasonId",
DROP COLUMN "serieId",
ALTER COLUMN "postId" SET NOT NULL;

-- CreateTable
CREATE TABLE "CommentWatch" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serieId" TEXT,
    "seasonId" TEXT,
    "episodeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentWatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommentWatch_serieId_idx" ON "CommentWatch"("serieId");

-- CreateIndex
CREATE INDEX "CommentWatch_seasonId_idx" ON "CommentWatch"("seasonId");

-- CreateIndex
CREATE INDEX "CommentWatch_episodeId_idx" ON "CommentWatch"("episodeId");

-- CreateIndex
CREATE INDEX "CommentWatch_userId_idx" ON "CommentWatch"("userId");

-- CreateIndex
CREATE INDEX "CommentWatch_createdAt_idx" ON "CommentWatch"("createdAt");

-- AddForeignKey
ALTER TABLE "CommentWatch" ADD CONSTRAINT "CommentWatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentWatch" ADD CONSTRAINT "CommentWatch_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentWatch" ADD CONSTRAINT "CommentWatch_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentWatch" ADD CONSTRAINT "CommentWatch_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
