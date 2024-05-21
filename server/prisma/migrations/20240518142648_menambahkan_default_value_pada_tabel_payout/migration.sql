-- AlterTable
ALTER TABLE `payout` MODIFY `amount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
