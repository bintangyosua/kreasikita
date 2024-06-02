/*
  Warnings:

  - You are about to drop the column `receiverId` on the `donation` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `donation` table. All the data in the column will be lost.
  - Added the required column `receiverUsername` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_senderId_fkey`;

-- AlterTable
ALTER TABLE `donation` DROP COLUMN `receiverId`,
    DROP COLUMN `senderId`,
    ADD COLUMN `receiverUsername` VARCHAR(50) NOT NULL,
    ADD COLUMN `senderUsername` VARCHAR(50) NULL;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_receiverUsername_fkey` FOREIGN KEY (`receiverUsername`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_senderUsername_fkey` FOREIGN KEY (`senderUsername`) REFERENCES `User`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;
