/*
  Warnings:

  - Made the column `familyTreeId` on table `Lineage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Lineage" DROP CONSTRAINT "Lineage_familyTreeId_fkey";

-- AlterTable
ALTER TABLE "Lineage" ALTER COLUMN "familyTreeId" SET NOT NULL,
ALTER COLUMN "familyTreeId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lineageId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Lineage" ADD CONSTRAINT "Lineage_familyTreeId_fkey" FOREIGN KEY ("familyTreeId") REFERENCES "FamilyTree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
