import { EstadoNotificacao } from "@prisma/client";
import prisma from "../../config/database";
import { INotificacao } from "../entities/INotificacao";

class Notificacao {
    id?: number;
    usuarioId : number;
    title :  string;
    message : string;
    status ? : EstadoNotificacao;
    createdAt?: Date;
    updatedAt?: Date;

  constructor({
    id,
    message,
    title,
    status,
    usuarioId,
    createdAt = new Date(),
    updatedAt = new Date(),
  }:  INotificacao) {
    this.id = id;
    this.message = message;
    this.title = title;
    this.usuarioId = usuarioId;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.notificacao.create({ data: this });
  }

  static async findById(id: number) {
    return await prisma.notificacao.findUnique({ where: { id }, include : { usuario : true }});
  }
  
  static async update(id: number, data: Partial<INotificacao>) {
    return await prisma.notificacao.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return await prisma.item.delete({ where: { id } });
  }
  static async findByUserId(userId: number) {
    return await prisma.notificacao.findMany({ where: { usuarioId : userId } });
  }
}

export default Notificacao;
