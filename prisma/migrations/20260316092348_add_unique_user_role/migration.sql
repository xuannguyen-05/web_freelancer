/*
  Warnings:

  - A unique constraint covering the columns `[userID,roleID]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_roles_userID_roleID_key` ON `user_roles`(`userID`, `roleID`);
