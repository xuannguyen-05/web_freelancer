-- CreateTable
CREATE TABLE `categories` (
    `categoryID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`categoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversation_participants` (
    `conversationParticipantsID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userID` INTEGER UNSIGNED NOT NULL,
    `conversationID` INTEGER UNSIGNED NOT NULL,

    INDEX `conversationID`(`conversationID`),
    INDEX `userID`(`userID`),
    PRIMARY KEY (`conversationParticipantsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversations` (
    `conversationID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `orderID` INTEGER UNSIGNED NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,

    INDEX `orderID`(`orderID`),
    PRIMARY KEY (`conversationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `freelancer_profiles` (
    `userID` INTEGER UNSIGNED NOT NULL,
    `slogan` VARCHAR(255) NULL,
    `descriptions` TEXT NULL,
    `level` TINYINT NULL DEFAULT 1,
    `rating` DECIMAL(2, 1) NULL DEFAULT 0.0,
    `reviewCount` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `freelancer_skills` (
    `userID` INTEGER UNSIGNED NOT NULL,
    `skillID` INTEGER UNSIGNED NOT NULL,

    INDEX `skillID`(`skillID`),
    PRIMARY KEY (`userID`, `skillID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gig_packages` (
    `packageID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `deliveryDay` INTEGER NOT NULL,
    `revision` INTEGER NULL DEFAULT 0,
    `gigID` INTEGER UNSIGNED NOT NULL,

    INDEX `gigID`(`gigID`),
    PRIMARY KEY (`packageID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gigs` (
    `gigID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `img_url` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `categoryID` INTEGER UNSIGNED NOT NULL,
    `freelancerID` INTEGER UNSIGNED NOT NULL,

    INDEX `categoryID`(`categoryID`),
    INDEX `freelancerID`(`freelancerID`),
    PRIMARY KEY (`gigID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `messageID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `senderID` INTEGER UNSIGNED NOT NULL,
    `content` TEXT NOT NULL,
    `read_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `conversationID` INTEGER UNSIGNED NOT NULL,

    INDEX `conversationID`(`conversationID`),
    INDEX `senderID`(`senderID`),
    PRIMARY KEY (`messageID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orderID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `buyerID` INTEGER UNSIGNED NOT NULL,
    `freelancerID` INTEGER UNSIGNED NOT NULL,
    `gigID` INTEGER UNSIGNED NOT NULL,
    `packageID` INTEGER UNSIGNED NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `serviceFee` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `delivered_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL,

    INDEX `buyerID`(`buyerID`),
    INDEX `freelancerID`(`freelancerID`),
    INDEX `gigID`(`gigID`),
    INDEX `packageID`(`packageID`),
    PRIMARY KEY (`orderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `reviewID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `orderID` INTEGER UNSIGNED NOT NULL,
    `reviewerID` INTEGER UNSIGNED NOT NULL,
    `revieweeID` INTEGER UNSIGNED NOT NULL,
    `rating` TINYINT NOT NULL,
    `comment` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `orderID`(`orderID`),
    INDEX `revieweeID`(`revieweeID`),
    INDEX `reviewerID`(`reviewerID`),
    PRIMARY KEY (`reviewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `roleID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `roleName`(`roleName`),
    PRIMARY KEY (`roleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `skillID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `skillName` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `skillName`(`skillName`),
    PRIMARY KEY (`skillID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `userRoleID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userID` INTEGER UNSIGNED NOT NULL,
    `roleID` INTEGER UNSIGNED NOT NULL,

    INDEX `roleID`(`roleID`),
    INDEX `userID`(`userID`),
    PRIMARY KEY (`userRoleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `userID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NULL,
    `bio` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `conversation_participants` ADD CONSTRAINT `conversation_participants_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `conversation_participants` ADD CONSTRAINT `conversation_participants_ibfk_2` FOREIGN KEY (`conversationID`) REFERENCES `conversations`(`conversationID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders`(`orderID`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `freelancer_profiles` ADD CONSTRAINT `freelancer_profiles_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `freelancer_skills` ADD CONSTRAINT `freelancer_skills_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `freelancer_skills` ADD CONSTRAINT `freelancer_skills_ibfk_2` FOREIGN KEY (`skillID`) REFERENCES `skills`(`skillID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `gig_packages` ADD CONSTRAINT `gig_packages_ibfk_1` FOREIGN KEY (`gigID`) REFERENCES `gigs`(`gigID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `gigs` ADD CONSTRAINT `gigs_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories`(`categoryID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `gigs` ADD CONSTRAINT `gigs_ibfk_2` FOREIGN KEY (`freelancerID`) REFERENCES `users`(`userID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`senderID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`conversationID`) REFERENCES `conversations`(`conversationID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`buyerID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`freelancerID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`gigID`) REFERENCES `gigs`(`gigID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`packageID`) REFERENCES `gig_packages`(`packageID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders`(`orderID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`reviewerID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`revieweeID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`roleID`) REFERENCES `roles`(`roleID`) ON DELETE CASCADE ON UPDATE RESTRICT;
