-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_dropOffUserId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_pickupUserId_fkey";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "pickupUserId" DROP NOT NULL,
ALTER COLUMN "dropOffUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_pickupUserId_fkey" FOREIGN KEY ("pickupUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_dropOffUserId_fkey" FOREIGN KEY ("dropOffUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
