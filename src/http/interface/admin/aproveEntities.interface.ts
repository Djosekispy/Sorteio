import { StatusPedido, TipoPerfil } from "@prisma/client";
import { IPedido } from "../../../database/entities/IPedido"
import { IUsuario } from "../../../database/entities/IUsuario";



interface IAproveEntities {
    showAllOrderByStatus( status : StatusPedido) : Promise<IPedido[] | { error : string }> 
    changeUserStatus(id : number, status : TipoPerfil) : Promise<IUsuario | { error : string }>

}


export  { IAproveEntities }