/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorName` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
CREATE SEQUENCE post_authorid_seq;
ALTER TABLE "Post" ADD COLUMN     "authorName" TEXT NOT NULL,
ALTER COLUMN "authorId" SET DEFAULT nextval('post_authorid_seq');
ALTER SEQUENCE post_authorid_seq OWNED BY "Post"."authorId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "picture",
ADD COLUMN     "aboutMe" TEXT,
ADD COLUMN     "displayname" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
