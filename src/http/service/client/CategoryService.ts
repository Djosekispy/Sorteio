import { ICategoria } from "../../../database/entities/ICategorias"
import Categoria from "../../../database/model/categoria"
import Sorteio from "../../../database/model/sorteio"
import { ICategory } from "../../interface/client/category.interface"
import EntitiesRepository from "../../repository/entity"


class CategoryService implements ICategory {
    constructor(private readonly entitiesRepository : EntitiesRepository){  }
    save = async (userId: number, data : ICategoria) : Promise<ICategoria |  { error : string}> => {
        try {
            const raffle = await Sorteio.findById(data.sorteioId)
            const entity = await this.entitiesRepository.isOwner(userId,data.sorteioId)
            if(!raffle) return { error : 'Sorteio não encontrado'}
            if(!entity) return { error : 'Não tem permissão para criar categoria nesse sorteio'}
            const category = new Categoria(data)
            await category.save()
        return category as ICategoria
        } catch (error) {
            return { error : 'Erro ao salvar categoria : ' + error}
        }
    }   
    update = async (userId: number,id: number, data: Partial<ICategoria>): Promise<ICategoria | { error: string }> => {

       try {
        const category = await Categoria.findById(id)
        if(!category) return { error : 'Categoria não encontrada'}
        
        const entity = await this.entitiesRepository.isOwner(userId, category.sorteioId)
        if(!entity) return { error : 'Não tem permissão para atualizar categoria nesse sorteio'}
      
        await Categoria.update(id,data)
        return await Categoria.findById(id) as ICategoria
       } catch (error) {
        return { error : 'Erro ao atualizar categoria : ' + error}
       }
    }
    delete = async (userId: number,id: number): Promise<void | { error: string }> => {
       try {
        const category = await Categoria.findById(id)
        if(!category) return { error : 'Categoria não encontrada'}
        const entity = await this.entitiesRepository.isOwner(userId, category.sorteioId)
        if(!entity) return { error : 'Não tem permissão para deletar categoria nesse sorteio'}
        await Categoria.delete(id)
      
       } catch (error) {
        return { error : 'Erro ao deletar categoria : ' + error}
       }
    }
    async show(categoryId : number) :  Promise<ICategoria |  { error : string}>
    {
        try {
            const category = await Categoria.findById(categoryId);
            if(!category){
                return { error : "Categoria Inexistente"}
            }
            return category
        } catch (error) {
            return { error : "Algo Inesperado " +  error}
        }
    }
    async all() :  Promise<ICategoria[] |  { error : string}>{
        return await Categoria.all();
    }
}


export { CategoryService }