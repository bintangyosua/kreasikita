/*
  Warnings:

  - Added the required column `card_number` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payout` ADD COLUMN `card_number` VARCHAR(191) NOT NULL;
