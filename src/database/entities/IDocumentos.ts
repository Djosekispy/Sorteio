import { EstadoDocumento } from "@prisma/client";


export interface IDocumentos {
    id?: number;
    bilheteUrl: string;
    nif: string;
    licenca: string;
    estado: EstadoDocumento;
    usuarioId: number;
    createdAt: Date;
    updatedAt: Date;
}