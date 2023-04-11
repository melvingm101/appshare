/*
  Warnings:

  - Added the required column `likeType` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('LIKE', 'LOVE', 'LAUGH', 'WOW', 'DISLIKE');

-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('WEB', 'MOBILE', 'DESIGN', 'TOOLS', 'PROMOTION', 'VIDEO', 'GAMES', 'OTHER');

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "likeType" "LikeType" NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "tags" "Tags"[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tagline" TEXT NOT NULL DEFAULT 'Just another appshare user!';

-- CreateTable
CREATE TABLE "CommentLike" (
    "id" SERIAL NOT NULL,
    "likeType" "LikeType" NOT NULL,
    "commentId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
