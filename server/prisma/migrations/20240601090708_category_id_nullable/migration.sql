-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_categoryId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
