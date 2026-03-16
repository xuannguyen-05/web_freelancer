/*
  Warnings:

  - Made the column `created_at` on table `gigs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `gigs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `gigs` DROP FOREIGN KEY `gigs_ibfk_1`;

-- DropForeignKey
ALTER TABLE `gigs` DROP FOREIGN KEY `gigs_ibfk_2`;

-- AlterTable
ALTER TABLE `gigs` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `gigs` ADD CONSTRAINT `gigs_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `categories`(`categoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gigs` ADD CONSTRAINT `gigs_freelancerID_fkey` FOREIGN KEY (`freelancerID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
