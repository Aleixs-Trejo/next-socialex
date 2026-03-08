-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "tags" TEXT[];

-- DropEnum
DROP TYPE "Genre";
