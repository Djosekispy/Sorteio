import prisma from "../../config/database";
import { EstadoCandidatura } from "@prisma/client";
import { IInscricoes } from "../entities/IInscricoes";

class Inscricao {
  id?: number;
  usuarioId: number;
  itemId: number;
  estado_candidatura: EstadoCandidatura;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    usuarioId,
    itemId,
    estado_candidatura = EstadoCandidatura.pendente,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: IInscricoes) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.itemId = itemId;
    this.estado_candidatura = estado_candidatura;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.inscricao.create({ data: this });
  }

  static async findById(id: number) {
    return await prisma.inscricao.findUnique({ where: { id } });
  }

  static async update(id: number, data: Partial<Inscricao>) {
    return await prisma.inscricao.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return await prisma.inscricao.delete({ where: { id } });
  }
}

export default Inscricao;
