/*
  Warnings:

  - Added the required column `categoryId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
