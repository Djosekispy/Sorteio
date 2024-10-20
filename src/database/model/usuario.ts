import { TipoPerfil } from "@prisma/client";
import prisma from "../../config/database";
import { IUsuario } from "../entities/IUsuario";


class Usuario {
  id?: bigint;
  nome_completo: string;
  data_nascimento?: Date;
  email: string;
  telefone: string;
  endereco?: string;
  senha: string;
  foto_perfil?: string;
  tipo_perfil: TipoPerfil;
  sexo?: string;
  estado_civil?: string;
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

  static async findById(id: bigint) {
    return await prisma.usuario.findUnique({ where: { id } });
  }

  static async findByEmail(email: string) {
    return await prisma.usuario.findUnique({ where: { email } });
  }

  static async findByPhoneNumber(telefone: string) {
    return await prisma.usuario.findUnique({ where: { telefone } });
  }

  static async update(id: bigint, data: Partial<Usuario>) {
    return await prisma.usuario.update({ where: { id }, data });
  }

  static async delete(id: bigint) {
    return await prisma.usuario.delete({ where: { id } });
  }
}

export default Usuario;
