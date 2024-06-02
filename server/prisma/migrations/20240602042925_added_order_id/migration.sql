/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `donation` ADD COLUMN `order_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Donation_order_id_key` ON `Donation`(`order_id`);
