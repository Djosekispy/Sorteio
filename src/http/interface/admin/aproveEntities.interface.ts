import { StatusPedido, TipoPerfil } from "@prisma/client";
import { IPedido } from "../../../database/entities/IPedido"
import { IUsuario } from "../../../database/entities/IUsuario";



interface IAproveEntities {
    showAllOrderByStatus( status : StatusPedido) : Promise<IPedido[] | { error : string }> 
    changeUserStatus(status : TipoPerfil,idOrder : number) : Promise<IUsuario | { error : string }>
    changeUserStatusReject(id : number,idOrder : number) : Promise<IUsuario | { error : string }>
}


export  { IAproveEntities }