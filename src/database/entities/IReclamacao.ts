

export interface IReclamacao {
    id?: number;
    titulo: string;
    conteudo: string;
    usuarioId: number;
    sorteioId: number;
    createdAt?: Date;
    updatedAt?: Date;
}