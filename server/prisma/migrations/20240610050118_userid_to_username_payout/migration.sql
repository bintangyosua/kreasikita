/*
  Warnings:

  - You are about to drop the column `userId` on the `payout` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Payout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payout` DROP FOREIGN KEY `Payout_userId_fkey`;

-- AlterTable
ALTER TABLE `payout` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Payout_username_key` ON `Payout`(`username`);

-- AddForeignKey
ALTER TABLE `Payout` ADD CONSTRAINT `Payout_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
