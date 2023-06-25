/*
  Warnings:

  - You are about to drop the column `State` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "State",
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Il';
