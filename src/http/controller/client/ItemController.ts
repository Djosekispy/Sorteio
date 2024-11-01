import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../../@types/express";
import { ItemService } from "../../service/client/ItemService";


class ItemController {
    constructor(private itemService : ItemService){}
    saveItem = async (req:IGetUserAuthInfoRequest,res:Response) => {
        const userId = req.userId as number
        const { nome,descricao,categoriaId,propriedades } = req.body
        const item = await this.itemService.save(userId,{nome,descricao,categoriaId,propriedades})
        if('error' in item) return res.status(400).json({ error : item.error})
        return res.status(200).json({message : 'Item criado com sucesso',item})
    }

    updateItem = async (req:IGetUserAuthInfoRequest,res:Response) => {
        const userId = req.userId as number
        const { id } = req.params
        const { nome,descricao,categoriaId,propriedades } = req.body
        const item = await this.itemService.update(userId,parseInt(id),{nome,descricao,categoriaId,propriedades})
        if('error' in item) return res.status(400).json({ error : item.error})
        return res.status(200).json({message : 'Item atualizado com sucesso',item})
    }
    deleteItem = async (req:IGetUserAuthInfoRequest,res:Response) => {
        const userId = req.userId as number
        const { id } = req.params
        const item = await this.itemService.delete(userId,parseInt(id))
        if('error' in Object(item)) return res.status(400).json({ error : item?.error})
        return res.status(200).json({message : 'Item deletado com sucesso'})
    }
}

export default ItemController