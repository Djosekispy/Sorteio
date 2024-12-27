import { StatusPedido, TipoPerfil } from "@prisma/client";
import { IPedido } from "../../../database/entities/IPedido";
import { IUsuario } from "../../../database/entities/IUsuario";
import Usuario from "../../../database/model/usuario";
import Pedido from "../../../database/model/pedido";
import { IAproveEntities } from "../../interface/admin/aproveEntities.interface";



class AprovaEntitiesService implements IAproveEntities {

    async showAllOrderByStatus( status : StatusPedido) : Promise<IPedido[] | { error : string }> 
    {
        try {
            const orders = await Pedido.findByStatusOrder(status)
            if(!orders){
                return { error : `Nenhum pedido ${status} encontrado`}
            }
            return orders as IPedido[]
        } catch (error) {
            return { error : 'Algo Inesperado : ' + error }
        }
    }
   async changeUserStatus(status : TipoPerfil,idOrder : number) : Promise<IUsuario | { error : string }>
   {
    try {
        const order = await Pedido.findById(idOrder)
        if(!order){
            return { error : 'Usuário Não existe'}
        }
        await Usuario.update(order.usuarioId,{tipo_perfil : status})
        await Pedido.update(idOrder,{estado : 'aceite'})
        return await Usuario.findById(order.usuarioId) as IUsuario
    } catch (error) {
        return { error : 'Algo Inesperado : ' + error }
    }
   }
   async changeUserStatusReject(id : number,idOrder : number) : Promise<IUsuario | { error : string }>
   {
    try {
        const user = await Usuario.findById(id)
        const order = await Pedido.findById(idOrder)
        if(!user || !order){
            return { error : 'Usuário Não existe'}
        }
        await Pedido.update(idOrder,{estado : 'rejeitado'})
        await Usuario.update(id,{tipo_perfil : 'cliente'}) as IUsuario
        return await Usuario.findById(id) as IUsuario
    } catch (error) {
        return { error : 'Algo Inesperado : ' + error }
    }
   }
}


export default AprovaEntitiesService;