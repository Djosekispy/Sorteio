import prisma from "../../config/database";
import { EstadoDocumento } from "@prisma/client";
import { IDocumentos } from "../entities/IDocumentos";

class Documento {
  id?: number;
  bilheteUrl: string;
  nif: string;
  licenca: string;
  estado: EstadoDocumento;
  usuarioId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    bilheteUrl,
    nif,
    licenca,
    estado = EstadoDocumento.pendente,
    usuarioId,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: IDocumentos) {
    this.id = id;
    this.bilheteUrl = bilheteUrl;
    this.nif = nif;
    this.licenca = licenca;
    this.estado = estado;
    this.usuarioId = usuarioId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.documento.create({ data: this });
  }

  static async findById(id: number) {
    return await prisma.documento.findUnique({ where: { id }, include :{ usuario : true} });
  }
  static async findByUserId(id: number){
      return await prisma.documento.findMany({ where: {usuarioId: id }, include :{ usuario : true} });
  }
  static async update(id: number, data: Partial<Documento>) {
    return await prisma.documento.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return await prisma.documento.delete({ where: { id } });
  }
}

export default Documento;
