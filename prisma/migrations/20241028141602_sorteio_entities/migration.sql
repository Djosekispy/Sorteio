-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `estado` ENUM('aceite', 'rejeitado', 'pendente') NULL DEFAULT 'pendente';
