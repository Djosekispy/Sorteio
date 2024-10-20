-- CreateTable
CREATE TABLE `Usuario` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `foto_perfil` VARCHAR(191) NOT NULL,
    `tipo_perfil` ENUM('cliente', 'sorteador') NOT NULL DEFAULT 'cliente',
    `sexo` VARCHAR(191) NOT NULL,
    `estado_civil` VARCHAR(191) NOT NULL,
    `numero_bilhete` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_telefone_key`(`telefone`),
    UNIQUE INDEX `Usuario_numero_bilhete_key`(`numero_bilhete`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscricao` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `usuarioId` BIGINT NOT NULL,
    `itemId` BIGINT NOT NULL,
    `estado_candidatura` ENUM('aprovado', 'recusado', 'ganho', 'pendente') NOT NULL DEFAULT 'pendente',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `bilheteUrl` VARCHAR(191) NOT NULL,
    `nif` VARCHAR(191) NOT NULL,
    `licenca` VARCHAR(191) NOT NULL,
    `estado` ENUM('verificado', 'pendente') NOT NULL DEFAULT 'pendente',
    `usuarioId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrador` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Administrador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reclamacao` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `conteudo` VARCHAR(191) NOT NULL,
    `usuarioId` BIGINT NOT NULL,
    `sorteioId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sorteio` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `data_realizacao` DATETIME(3) NOT NULL,
    `status` ENUM('corrente', 'cancelado', 'finalizado') NOT NULL DEFAULT 'corrente',
    `organizadorId` BIGINT NOT NULL,
    `politicas` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `propriedades` JSON NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `categoriaId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `sorteioId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
