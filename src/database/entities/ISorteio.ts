import { StatusSorteio } from "@prisma/client"

export interface ISorteio {
    id? : number,
  nome : string,
  cover ? : string;
  data_realizacao : Date
  status : StatusSorteio,
  organizadorId :  number,
  politicas    :   string
  createdAt ?: Date,
  updatedAt ?: Date
}