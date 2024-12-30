/// <reference path="../../@types/express.d.ts" />

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import multer from 'multer';
import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { storagebucket } from '../utils/firebase';

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, 
    },
}).fields([
    { name: 'bilheteUrl', maxCount: 1 },
    { name: 'nif', maxCount: 1 },
    { name: 'licenca', maxCount: 1 },
]);

async function uploadFileToFirebase(file: Express.Multer.File, storagePath: string): Promise<string> {
    try {
        const uniqueFileName = `${uuidv4()}_${file.originalname}`;
        const fileRef = ref(storagebucket, `${storagePath}/${uniqueFileName}`);
        await uploadBytes(fileRef, file.buffer);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
        throw new Error(`Erro ao fazer upload do arquivo: ${error}`);
    }
}

export const uploadDocumentsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message : 'Erro no upload do arquivo.' });
        } else if (err) {
            return res.status(500).json({ message : 'Erro no upload do arquivo.' });
        }

        if (!req.files) {
            return  res.status(500).json({ message : 'Arquivos devem ser carregados.' });
        }

        try {
            const { bilheteUrl, nif, licenca } = req.files as {
                bilheteUrl?: Express.Multer.File[];
                nif?: Express.Multer.File[];
                licenca?: Express.Multer.File[];
            };

            const uploadedFiles: Partial<Record<string, string>> = {};

            if (bilheteUrl && bilheteUrl[0]) {
                uploadedFiles.bilheteUrl = await uploadFileToFirebase(bilheteUrl[0], 'documents/bilhete');
            }

            if (nif && nif[0]) {
                uploadedFiles.nif = await uploadFileToFirebase(nif[0], 'documents/nif');
            }

            if (licenca && licenca[0]) {
                uploadedFiles.licenca = await uploadFileToFirebase(licenca[0], 'documents/licenca');
            }

            req.body = { ...req.body, ...uploadedFiles };
            next();
        } catch (error) {
            return res.status(500).json({ message : 'Erro ao processar uploads.' });
        }
    });
};
