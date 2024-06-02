/*
  Warnings:

  - You are about to drop the column `amount` on the `donation` table. All the data in the column will be lost.
  - You are about to drop the column `timeCreated` on the `donation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `donation` DROP COLUMN `amount`,
    DROP COLUMN `timeCreated`,
    ADD COLUMN `gross_amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `payment_type` VARCHAR(191) NULL,
    ADD COLUMN `transaction_status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    ADD COLUMN `transaction_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
