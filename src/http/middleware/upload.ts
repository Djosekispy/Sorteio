/// <reference path="../../@types/express.d.ts" />

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import multer from 'multer';
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { storagebucket } from '../utils/firebase';
import { IGetUserAuthInfoRequest } from '../../@types/express';


const storage = multer.memoryStorage(); 

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, 
    },
}).single('file'); 

async function uploadFileToFirebase(file: Express.Multer.File, storagePath: string): Promise<string> {
    try {
        const uniqueFileName = `${uuidv4()}_${file.originalname}`;
        const fileRef = ref(storagebucket, `${storagePath}/${uniqueFileName}`);
        await uploadBytes(fileRef, file.buffer);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
        console.error('Erro ao fazer upload do arquivo:', error);
        throw new Error(`Erro ao fazer upload do arquivo: ${error}`);
    }
}
export const uploadFileMiddleware = (req: IGetUserAuthInfoRequest, res: Response, next: express.NextFunction) => {
    upload(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
            console.error('Erro no upload do arquivo:', err);
            return res.status(400).send('Erro no upload do arquivo.');
        } else if (err) {
            console.error('Erro no upload do arquivo:', err);
            return res.status(500).send('Erro no upload do arquivo.');
        }

        if (!req.file) {
            return next();
        }

        const storagePath = 'files';
        try {
            const downloadURL = await uploadFileToFirebase(req.file, storagePath);
            req.downloadURL = downloadURL;
            next();
        } catch (error) {
            console.error('Erro ao fazer upload do arquivo:', error);
            return res.status(500).send('Erro ao fazer upload do arquivo.');
        }
    });
};
