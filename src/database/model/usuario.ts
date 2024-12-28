import { TipoPerfil } from "@prisma/client";
import prisma from "../../config/database";
import { IUsuario } from "../entities/IUsuario";


class Usuario {
  id?: number;
  nome_completo: string;
  data_nascimento?: Date;
  email: string;
  telefone?: string;
  endereco?: string;
  senha: string;
  foto_perfil?: string;
  tipo_perfil: TipoPerfil;
  sexo?: string;
  token_acesso? : string;
  estado_civil?: string;
  codigo_recuperacao? : number;
  numero_bilhete?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    nome_completo,
    data_nascimento,
    email,
    telefone,
    endereco,
    senha,
    foto_perfil,
    tipo_perfil = TipoPerfil.cliente,
    sexo,
    estado_civil,
    numero_bilhete,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: IUsuario) {
    this.id = id;
    this.nome_completo = nome_completo;
    this.data_nascimento = data_nascimento;
    this.email = email;
    this.telefone = telefone;
    this.endereco = endereco;
    this.senha = senha;
    this.foto_perfil = foto_perfil;
    this.tipo_perfil = tipo_perfil;
    this.sexo = sexo;
    this.estado_civil = estado_civil;
    this.numero_bilhete = numero_bilhete;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.usuario.create({ data: this });
  }

  static async findById(id: number) {
    return await prisma.usuario.findUnique({ where: { id }, include : { documentos : true} });
  }

  static async findByEmail(email: string) {
    return await prisma.usuario.findUnique({ where: { email } , include : { documentos : true} });
  }

  static async findByPhoneNumber(telefone: string) {
    return await prisma.usuario.findUnique({ where: { telefone }, include : { documentos : true }});
  }

  static async update(id: number, data: Partial<Usuario>) {
    return await prisma.usuario.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return await prisma.usuario.delete({ where: { id } });
  }
}

export default Usuario;
