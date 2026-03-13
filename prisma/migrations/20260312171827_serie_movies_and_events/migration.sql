/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `ContentReaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,eventId]` on the table `ContentReaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "CommentWatch_movieId_idx" ON "CommentWatch"("movieId");

-- CreateIndex
CREATE INDEX "CommentWatch_eventId_idx" ON "CommentWatch"("eventId");

-- CreateIndex
CREATE INDEX "ContentReaction_movieId_idx" ON "ContentReaction"("movieId");

-- CreateIndex
CREATE INDEX "ContentReaction_eventId_idx" ON "ContentReaction"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentReaction_userId_movieId_key" ON "ContentReaction"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentReaction_userId_eventId_key" ON "ContentReaction"("userId", "eventId");
