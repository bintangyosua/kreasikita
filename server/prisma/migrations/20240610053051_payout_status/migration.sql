/*
  Warnings:

  - You are about to alter the column `status` on the `payout` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `payout` MODIFY `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending';
