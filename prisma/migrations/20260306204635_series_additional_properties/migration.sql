-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ANIME', 'SERIE', 'MOVIE');

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Serie" ADD COLUMN     "genre" TEXT,
ADD COLUMN     "subgenre" TEXT;
