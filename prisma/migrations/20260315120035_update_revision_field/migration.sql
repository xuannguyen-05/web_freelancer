/*
  Warnings:

  - Made the column `revision` on table `gig_packages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `gig_packages` MODIFY `revision` INTEGER NOT NULL DEFAULT 0;
