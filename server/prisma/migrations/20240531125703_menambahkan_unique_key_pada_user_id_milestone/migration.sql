/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Milestones` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Milestones_userId_key` ON `Milestones`(`userId`);
