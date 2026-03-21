/*
  Warnings:

  - A unique constraint covering the columns `[orderID]` on the table `conversations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `conversations_orderID_key` ON `conversations`(`orderID`);
