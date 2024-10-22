/*
  Warnings:

  - Added the required column `token_acesso` to the `Administrador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `administrador` ADD COLUMN `token_acesso` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `token_acesso` VARCHAR(191) NULL;
