-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_receiverUsername_fkey`;

-- AlterTable
ALTER TABLE `donation` MODIFY `receiverUsername` VARCHAR(50) NULL;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_receiverUsername_fkey` FOREIGN KEY (`receiverUsername`) REFERENCES `User`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;
