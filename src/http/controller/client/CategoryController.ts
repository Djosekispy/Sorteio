import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../../@types/express";
import { ICategory } from "../../interface/client/category.interface";



class CategoryController {
    constructor(private categoryService : ICategory){}

    saveCategory = async (req:IGetUserAuthInfoRequest,res:Response) => {
        const  userId  = req.userId as number
        const { nome,descricao,sorteioId } = req.body;
        const category = await this.categoryService.save(userId, { nome,descricao,sorteioId })
        if('error' in category) return res.status(400).json({ error : category.error})
        return res.status(200).json({message : 'Categoria criada com sucesso',category})
    }
    deleteCategory = async (req:IGetUserAuthInfoRequest,res:Response) => {
        const  userId  = req.userId as number
        const { id } = req.params
        const category = await this.categoryService.delete(userId,parseInt(id))
        if('error' in Object(category)) return res.status(400).json({ error : category?.error})
        return res.status(200).json({ message : 'Categoria deletada com sucesso'})
    }
    updateCategory = async (req:IGetUserAuthInfoRequest,res:Response) => {
        const  userId  = req.userId as number
        const { id } = req.params
        const { nome,descricao} = req.body;
        const category = await this.categoryService.update(userId,parseInt(id),{ nome,descricao})
        if('error' in category) return res.status(400).json({ error : category.error})
        return res.status(200).json({message : 'Categoria atualizada com sucesso',category})
    }

    showCategorybyId = async (req:IGetUserAuthInfoRequest,res:Response) => {
        const { id } = req.params
        const category = await this.categoryService.show(parseInt(id))
        if('error' in category) return res.status(400).json({ error : category.error})
        return res.status(200).json({message : 'Informações da categoria',category})
    }

    showAllCategory = async (req:IGetUserAuthInfoRequest,res:Response) => {
        const { id } = req.params
        const category = await this.categoryService.all()
        return res.status(200).json({message : 'Todas as categorias',category})
    }
}

export { CategoryController }
