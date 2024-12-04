import prisma from "../../config/database";
import { IItens } from "../entities/IItens";

class Item {
  id?: number;
  nome: string;
  propriedades: object;
  descricao: string;
  categoriaId: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    nome,
    propriedades,
    descricao,
    categoriaId,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: IItens) {
    this.id = id;
    this.nome = nome;
    this.propriedades = propriedades;
    this.descricao = descricao;
    this.categoriaId = categoriaId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.item.create({ data: this });
  }

  static async findById(id: number) {
    return await prisma.item.findUnique({ where: { id }, include : { inscricoes : { include : { usuario : true}}} });
  }
  static async findByCategory(categoriaId: number) {
    return await prisma.item.findMany({ where: { categoriaId },include :{ inscricoes: {
      include : {
        usuario : true
      }
    } } });
  }
  static async update(id: number, data: Partial<Item>) {
    return await prisma.item.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return await prisma.item.delete({ where: { id } });
  }
}

export default Item;
