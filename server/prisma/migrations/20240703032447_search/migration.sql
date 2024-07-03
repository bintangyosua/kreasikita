-- CreateIndex
CREATE FULLTEXT INDEX `User_username_name_description_idx` ON `User`(`username`, `name`, `description`);
