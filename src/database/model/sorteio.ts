import prisma from "../../config/database";
import { StatusSorteio } from "@prisma/client";
import { ISorteio } from "../entities/ISorteio";

class Sorteio {
  id?: number;
  nome: string;
  data_realizacao: Date;
  cover ? : string;
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
    cover ,
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
    this.cover = cover ;
    this.updatedAt = updatedAt;
  }

  async save() {
    return await prisma.sorteio.create({ data: this });
  }

  static async findById(id: number) {
    return await prisma.sorteio.findUnique({ where: { id },
    include : {
      categorias : {include : {itens : { include : {inscricoes : {
        include : {
          usuario : true
          }
        }
        }
      }
    }
    },
      reclamacoes : true
    } });
  }
  static async findAll() {
    return await prisma.sorteio.findMany({include: { 
            categorias : { include : { itens : {include : {inscricoes : true}}}}, 
            reclamacoes : {include : { usuario : true}}
          }});
  }
  static async findByUserId(organizadorId: number) {
    return await prisma.sorteio.findMany({ where: { organizadorId } });
  }
  
  static async update(id: number, data: Partial<Sorteio>) {
    return await prisma.sorteio.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return await prisma.sorteio.delete({ where: { id } });
  }
}

export default Sorteio;
