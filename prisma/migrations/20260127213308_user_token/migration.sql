-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboardingToken" TEXT,
ADD COLUMN     "onboardingTokenExpires" TIMESTAMP(3);
