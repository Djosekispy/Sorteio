import { TipoPerfil } from "@prisma/client";


export interface IUsuario {
    id?: bigint;
    nome_completo: string;
    data_nascimento?: Date;
    email: string;
    telefone: string;
    endereco: string;
    senha: string;
    foto_perfil?: string;
    tipo_perfil?: TipoPerfil;
    sexo?: string;
    estado_civil?: string;
    numero_bilhete?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }