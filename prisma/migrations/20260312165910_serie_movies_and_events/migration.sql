/*
  Warnings:

  - Made the column `title` on table `Season` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CommentWatch" ADD COLUMN     "eventId" TEXT,
ADD COLUMN     "movieId" TEXT;

-- AlterTable
ALTER TABLE "ContentReaction" ADD COLUMN     "eventId" TEXT,
ADD COLUMN     "movieId" TEXT;

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "title" SET NOT NULL;

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "serieId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT,
    "r2Key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "serieId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT,
    "r2Key" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_serieId_title_key" ON "Movie"("serieId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Event_serieId_title_key" ON "Event"("serieId", "title");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentReaction" ADD CONSTRAINT "ContentReaction_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentReaction" ADD CONSTRAINT "ContentReaction_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentWatch" ADD CONSTRAINT "CommentWatch_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentWatch" ADD CONSTRAINT "CommentWatch_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
