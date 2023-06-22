-- CreateEnum
CREATE TYPE "SUBSCRIPTION" AS ENUM ('active', 'inactive', 'pending');

-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "subscription" "SUBSCRIPTION" NOT NULL DEFAULT 'inactive';
