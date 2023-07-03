-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lineageId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Lineage" (
    "id" SERIAL NOT NULL,
    "familyTreeId" INTEGER,

    CONSTRAINT "Lineage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyTree" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "FamilyTree_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lineageId_fkey" FOREIGN KEY ("lineageId") REFERENCES "Lineage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lineage" ADD CONSTRAINT "Lineage_familyTreeId_fkey" FOREIGN KEY ("familyTreeId") REFERENCES "FamilyTree"("id") ON DELETE SET NULL ON UPDATE CASCADE;
