-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `pfp` TEXT NULL,
    `banner` TEXT NULL,
    `categoryId` INTEGER NULL,
    `description` MEDIUMTEXT NULL,
    `balance` INTEGER NOT NULL DEFAULT 0,
    `role` ENUM('client', 'admin') NOT NULL DEFAULT 'client',

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` VARCHAR(191) NOT NULL,
    `gross_amount` INTEGER NOT NULL DEFAULT 0,
    `senderUsername` VARCHAR(50) NULL DEFAULT 'anonymous',
    `senderEmail` VARCHAR(191) NULL,
    `senderName` VARCHAR(191) NOT NULL DEFAULT 'Orang Baik',
    `receiverUsername` VARCHAR(50) NULL,
    `payment_type` VARCHAR(191) NULL,
    `transaction_status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `message` TEXT NULL,
    `transaction_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Donation_order_id_key`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Milestones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `target` INTEGER NOT NULL,
    `current` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `timecreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Milestones_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `username` VARCHAR(50) NOT NULL,
    `timecreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bank_code` VARCHAR(20) NOT NULL,
    `card_number` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bank` (
    `bank_code` VARCHAR(20) NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Bank_bank_code_key`(`bank_code`),
    PRIMARY KEY (`bank_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_receiverUsername_fkey` FOREIGN KEY (`receiverUsername`) REFERENCES `User`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_senderUsername_fkey` FOREIGN KEY (`senderUsername`) REFERENCES `User`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestones` ADD CONSTRAINT `Milestones_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payout` ADD CONSTRAINT `Payout_bank_code_fkey` FOREIGN KEY (`bank_code`) REFERENCES `Bank`(`bank_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payout` ADD CONSTRAINT `Payout_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
