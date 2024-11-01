    import { IItens } from "../../../database/entities/IItens"
import Categoria from "../../../database/model/categoria"
import Item from "../../../database/model/itens"
    import { IItem } from "../../interface/client/item.interface"
import IEntitiesRepository from "../../repositoryInterfaces/IEntitiesRepository"



class ItemService implements IItem {
    constructor(private entitiesRepository : IEntitiesRepository){}

    save = async (userId:number,data:IItens) : Promise<IItens | { error : string }> => {
        try {   
            const category = await Categoria.findById(data.categoriaId)
            if(!category) return { error : 'Categoria não encontrada'}
            const entity = await this.entitiesRepository.isOwner(userId, category.sorteioId)
            if(!entity) return { error : 'Não tem permissão para criar item nesse sorteio'}

            const item = new Item(data)
            await item.save()
            return item as IItens
    }catch(error){
        return { error : 'Erro ao criar item : ' + error}
    }
}

    update = async (userId:number,id:number,data:Partial<IItens>) : Promise<IItens | { error : string }> => {
        try {
            const itemtosubscribe = await Item.findById(id)
        if(!itemtosubscribe) return { error : 'Item não encontrado'}
        const category = await Categoria.findById(itemtosubscribe.categoriaId)
        if(!category) return { error : 'Categoria não encontrada'}
        const entity = await this.entitiesRepository.isOwner(userId, category.sorteioId)
        if(!entity) return { error : 'Não tem permissão para atualizar item nesse sorteio'}
        
        await Item.update(id,data)
        return await Item.findById(id) as IItens
    }catch(error){
        return { error : 'Erro ao atualizar item : ' + error}
    }
}

    delete = async (userId:number,id:number) : Promise<void | { error : string }> => {
        try {
            const item = await Item.findById(id)
            if(!item) return { error : 'Item não encontrado'}
            const category = await Categoria.findById(item.categoriaId)
            if(!category) return { error : 'Categoria não encontrada'}
            const entity = await this.entitiesRepository.isOwner(userId, category.sorteioId)
            if(!entity) return { error : 'Não tem permissão para deletar item nesse sorteio'}
            await Item.delete(id)
        }catch(error){
            return { error : 'Erro ao deletar item : ' + error}
        }
    }   
}

export { ItemService }

