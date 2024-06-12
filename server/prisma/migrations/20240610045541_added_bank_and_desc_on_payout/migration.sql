/*
  Warnings:

  - Added the required column `bank` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Donation_senderUsername_fkey` ON `donation`;

-- AlterTable
ALTER TABLE `payout` ADD COLUMN `bank` ENUM('bca', 'bni', 'bri', 'mandiri', 'btn', 'danamon', 'bsi') NOT NULL,
    ADD COLUMN `description` TEXT NULL;
