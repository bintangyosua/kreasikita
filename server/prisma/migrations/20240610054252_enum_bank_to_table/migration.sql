/*
  Warnings:

  - You are about to drop the column `bank` on the `payout` table. All the data in the column will be lost.
  - Added the required column `bank_code` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payout` DROP COLUMN `bank`,
    ADD COLUMN `bank_code` VARCHAR(20) NOT NULL;

-- CreateTable
CREATE TABLE `Bank` (
    `bank_code` VARCHAR(20) NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Bank_bank_code_key`(`bank_code`),
    PRIMARY KEY (`bank_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payout` ADD CONSTRAINT `Payout_bank_code_fkey` FOREIGN KEY (`bank_code`) REFERENCES `Bank`(`bank_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
