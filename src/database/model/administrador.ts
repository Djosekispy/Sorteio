import prisma from "../../config/database";
import { IAdministrador } from "../entities/IAdministrador";

class Administrador {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  token_acesso? : string;
  codigo_recuperacao? : number;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    nome,
    email,
    senha,
    telefone,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: IAdministrador) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.administrador.create({ data: this });
  }

  static async findById(id: number) {
    return await prisma.administrador.findUnique({ where: { id } });
  }
  static async findByEmail(email: string) {
    return await prisma.administrador.findUnique({ where: { email } });
  }
  static async update(id: number, data: Partial<Administrador>) {
    return await prisma.administrador.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return await prisma.administrador.delete({ where: { id } });
  }
}

export default Administrador;
