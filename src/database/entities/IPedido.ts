import { StatusPedido } from "@prisma/client";



export interface IPedido {
    id?: number;
    usuarioId : number;
    content :  string;
    estado ? : StatusPedido
    createdAt?: Date;
    updatedAt?: Date;
}