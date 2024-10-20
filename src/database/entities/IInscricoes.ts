import { EstadoCandidatura } from "@prisma/client";


export interface IInscricoes {
    id?: number;
    usuarioId: number;
    itemId: number;
    estado_candidatura: EstadoCandidatura;
    createdAt?: Date;
    updatedAt?: Date;
}