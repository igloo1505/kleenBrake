-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lineageId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lineageId" DROP NOT NULL,
ALTER COLUMN "lineageId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lineageId_fkey" FOREIGN KEY ("lineageId") REFERENCES "Lineage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
