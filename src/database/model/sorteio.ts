import prisma from "../../config/database";
import { StatusSorteio } from "@prisma/client";
import { ISorteio } from "../entities/ISorteio";

class Sorteio {
  id?: number;
  nome: string;
  data_realizacao: Date;
  status: StatusSorteio;
  organizadorId: number;
  politicas: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    nome,
    data_realizacao,
    status = StatusSorteio.corrente,
    organizadorId,
    politicas,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: ISorteio) {
    this.id = id;
    this.nome = nome;
    this.data_realizacao = data_realizacao;
    this.status = status;
    this.organizadorId = organizadorId;
    this.politicas = politicas;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.sorteio.create({ data: this });
  }

  static async findById(id: bigint) {
    return await prisma.sorteio.findUnique({ where: { id } });
  }

  static async update(id: bigint, data: Partial<Sorteio>) {
    return await prisma.sorteio.update({ where: { id }, data });
  }

  static async delete(id: bigint) {
    return await prisma.sorteio.delete({ where: { id } });
  }
}

export default Sorteio;
