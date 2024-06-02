-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_receiverUsername_fkey`;

-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_senderUsername_fkey`;

-- AlterTable
ALTER TABLE `donation` ADD COLUMN `receiverId` INTEGER NULL,
    ADD COLUMN `senderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
