-- AlterTable
ALTER TABLE `usuario` MODIFY `data_nascimento` DATETIME(3) NULL,
    MODIFY `endereco` VARCHAR(191) NULL,
    MODIFY `foto_perfil` VARCHAR(191) NULL,
    MODIFY `sexo` VARCHAR(191) NULL,
    MODIFY `estado_civil` VARCHAR(191) NULL,
    MODIFY `numero_bilhete` VARCHAR(191) NULL;
