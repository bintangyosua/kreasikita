/*
  Warnings:

  - You are about to drop the column `receiverId` on the `donation` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `donation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `donation` DROP COLUMN `receiverId`,
    DROP COLUMN `senderId`;
