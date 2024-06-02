/*
  Warnings:

  - Added the required column `senderEmail` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `donation` ADD COLUMN `senderEmail` VARCHAR(191) NOT NULL;
