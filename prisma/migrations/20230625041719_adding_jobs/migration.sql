-- AlterEnum
ALTER TYPE "ROLE" ADD VALUE 'EMPLOYEE';

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "zip" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Window" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Window_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "dateSubmitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "datePickedUp" TIMESTAMP(3),
    "dateReturned" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,
    "pickupWindowId" INTEGER NOT NULL,
    "dropOffWindowId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "pickupUserId" INTEGER NOT NULL,
    "dropOffUserId" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_pickupWindowId_key" ON "Job"("pickupWindowId");

-- CreateIndex
CREATE UNIQUE INDEX "Job_dropOffWindowId_key" ON "Job"("dropOffWindowId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_pickupWindowId_fkey" FOREIGN KEY ("pickupWindowId") REFERENCES "Window"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_dropOffWindowId_fkey" FOREIGN KEY ("dropOffWindowId") REFERENCES "Window"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_pickupUserId_fkey" FOREIGN KEY ("pickupUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_dropOffUserId_fkey" FOREIGN KEY ("dropOffUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
