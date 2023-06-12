/*
  Warnings:

  - The values [SELLER] on the enum `ROLE` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `UserThree` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ROLE_new" AS ENUM ('USER', 'ADMIN', 'BANNED');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "ROLE_new" USING ("role"::text::"ROLE_new");
ALTER TYPE "ROLE" RENAME TO "ROLE_old";
ALTER TYPE "ROLE_new" RENAME TO "ROLE";
DROP TYPE "ROLE_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "UserThree" DROP CONSTRAINT "UserThree_teacherId_fkey";

-- DropTable
DROP TABLE "UserThree";
