
export interface IAdministrador {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    codigo_recuperacao ? : number;
    telefone: string;
    token_acesso ? : string;
    createdAt: Date;
    updatedAt: Date;
  
}