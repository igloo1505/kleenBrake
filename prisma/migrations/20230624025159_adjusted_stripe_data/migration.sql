/*
  Warnings:

  - You are about to drop the column `subscribed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionPM` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscribed",
DROP COLUMN "subscriptionPM",
ADD COLUMN     "subscriptionId" TEXT;
