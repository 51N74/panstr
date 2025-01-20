/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "aboutMe" TEXT,
ADD COLUMN     "displayname" TEXT,
ADD COLUMN     "username" TEXT;
