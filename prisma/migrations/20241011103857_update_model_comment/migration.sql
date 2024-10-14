/*
  Warnings:

  - Added the required column `commentImage` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentName` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentImage" TEXT NOT NULL,
ADD COLUMN     "commentName" TEXT NOT NULL;
