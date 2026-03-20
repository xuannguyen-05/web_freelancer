/*
  Warnings:

  - A unique constraint covering the columns `[orderID,reviewerID]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ibfk_2`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ibfk_3`;

-- CreateIndex
CREATE UNIQUE INDEX `reviews_orderID_reviewerID_key` ON `reviews`(`orderID`, `reviewerID`);

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_reviewerID_fkey` FOREIGN KEY (`reviewerID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_revieweeID_fkey` FOREIGN KEY (`revieweeID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
