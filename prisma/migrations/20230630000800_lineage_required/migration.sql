/*
  Warnings:

  - Made the column `lineageId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lineageId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lineageId" SET NOT NULL,
ALTER COLUMN "lineageId" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lineageId_fkey" FOREIGN KEY ("lineageId") REFERENCES "Lineage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
