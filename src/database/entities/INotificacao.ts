import { EstadoNotificacao } from "@prisma/client";



export interface INotificacao {
    id?: number;
    usuarioId : number;
    title :  string;
    message : string;
    status ? : EstadoNotificacao;
    createdAt?: Date;
    updatedAt?: Date;
}