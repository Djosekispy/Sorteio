import prisma from "../../config/database";
import { IReclamacao } from "../entities/IReclamacao";

class Reclamacao {
  id?: number;
  titulo: string;
  conteudo: string;
  usuarioId: number;
  sorteioId: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    titulo,
    conteudo,
    usuarioId,
    sorteioId,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: IReclamacao) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.usuarioId = usuarioId;
    this.sorteioId = sorteioId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.reclamacao.create({ data: this });
  }

  static async findById(id: number) {
    return await prisma.reclamacao.findUnique({ where: { id }, include: { usuario: true } });
  }

  static async update(id: number, data: Partial<Reclamacao>) {
    return await prisma.reclamacao.update({ where: { id }, data });
  }
  
  static async find() {
    return await prisma.reclamacao.findMany({include: {usuario: true}});
  }

  static async delete(id: number) {
    return await prisma.reclamacao.delete({ where: { id } });
  }
}

export default Reclamacao;
