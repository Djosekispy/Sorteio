

export interface IItens {
    id?: number;
    nome: string;
    propriedades: object;
    descricao: string;
    categoriaId: number;
    createdAt?: Date;
    updatedAt?: Date;
}