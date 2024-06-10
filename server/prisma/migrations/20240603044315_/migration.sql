-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_senderId_fkey`;

-- DropIndex
DROP INDEX `Donation_receiverUsername_fkey` ON `donation`;

-- DropIndex
DROP INDEX `Donation_senderUsername_fkey` ON `donation`;

-- AlterTable
ALTER TABLE `donation` MODIFY `senderUsername` VARCHAR(50) NULL DEFAULT 'anonymous';

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_receiverUsername_fkey` FOREIGN KEY (`receiverUsername`) REFERENCES `User`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_senderUsername_fkey` FOREIGN KEY (`senderUsername`) REFERENCES `User`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;
