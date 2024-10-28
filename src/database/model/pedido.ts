import { StatusPedido } from "@prisma/client";
import prisma from "../../config/database";
import { IPedido } from "../entities/IPedido";

class Pedido {
    id?: number;
    usuarioId : number;
    content :  string;
    estado ? : StatusPedido
    createdAt?: Date;
    updatedAt?: Date;

  constructor({
     id,
    usuarioId,
    content,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: IPedido) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.pedido.create({ data: this });
  }
  static  async findByStatusOrder( status : StatusPedido){
  return await prisma.pedido.findMany({ where: { estado : status},
    include : {
    usuario : true
  } });
 }
 
  static async findById(id: number) {
    return await prisma.pedido.findUnique({ where: { id } });
  }

  static async update(id: number, data: Partial<Pedido>) {
    return await prisma.pedido.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return await prisma.pedido.delete({ where: { id } });
  }
}

export default Pedido;
