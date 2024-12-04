import prisma from "../../config/database";
import { ICategoria } from "../entities/ICategorias";

class Categoria {
  id?: number;
  nome: string;
  descricao: string;
  sorteioId: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    nome,
    descricao,
    sorteioId,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: ICategoria) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.sorteioId = sorteioId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.categoria.create({ data: this });
  }

  static async findById(id: number) {
    return await prisma.categoria.findUnique({ where: { id }, include : { itens : { include : { inscricoes : true}}} });
  }

  static async all() {
    return await prisma.categoria.findMany({ include: { itens : {include : {inscricoes : true}} } });
  }

  static async update(id: number, data: Partial<Categoria>) {
    return await prisma.categoria.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return await prisma.categoria.delete({ where: { id } });
  }
}

export default Categoria;
