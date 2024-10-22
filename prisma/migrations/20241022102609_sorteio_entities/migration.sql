/*
  Warnings:

  - The primary key for the `administrador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `administrador` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `categoria` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `sorteioId` on the `categoria` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `documento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `documento` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `usuarioId` on the `documento` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `inscricao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `inscricao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `usuarioId` on the `inscricao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `itemId` on the `inscricao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `item` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `categoriaId` on the `item` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `reclamacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `reclamacao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `usuarioId` on the `reclamacao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `sorteioId` on the `reclamacao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `sorteio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `sorteio` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `organizadorId` on the `sorteio` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `categoria` DROP FOREIGN KEY `Categoria_sorteioId_fkey`;

-- DropForeignKey
ALTER TABLE `documento` DROP FOREIGN KEY `Documento_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `inscricao` DROP FOREIGN KEY `Inscricao_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `inscricao` DROP FOREIGN KEY `Inscricao_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `reclamacao` DROP FOREIGN KEY `Reclamacao_sorteioId_fkey`;

-- DropForeignKey
ALTER TABLE `reclamacao` DROP FOREIGN KEY `Reclamacao_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `sorteio` DROP FOREIGN KEY `Sorteio_organizadorId_fkey`;

-- AlterTable
ALTER TABLE `administrador` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `token_acesso` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `categoria` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `sorteioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `documento` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `usuarioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `inscricao` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `usuarioId` INTEGER NOT NULL,
    MODIFY `itemId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `item` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `categoriaId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reclamacao` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `usuarioId` INTEGER NOT NULL,
    MODIFY `sorteioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `sorteio` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `organizadorId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Inscricao` ADD CONSTRAINT `Inscricao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscricao` ADD CONSTRAINT `Inscricao_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reclamacao` ADD CONSTRAINT `Reclamacao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reclamacao` ADD CONSTRAINT `Reclamacao_sorteioId_fkey` FOREIGN KEY (`sorteioId`) REFERENCES `Sorteio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sorteio` ADD CONSTRAINT `Sorteio_organizadorId_fkey` FOREIGN KEY (`organizadorId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_sorteioId_fkey` FOREIGN KEY (`sorteioId`) REFERENCES `Sorteio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
