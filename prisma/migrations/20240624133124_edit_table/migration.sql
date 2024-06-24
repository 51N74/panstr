/*
  Warnings:

  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE post_authorid_seq;
ALTER TABLE "Post" DROP COLUMN "published",
ALTER COLUMN "authorId" SET DEFAULT nextval('post_authorid_seq');
ALTER SEQUENCE post_authorid_seq OWNED BY "Post"."authorId";
