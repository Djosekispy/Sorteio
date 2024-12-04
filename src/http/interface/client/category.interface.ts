import { ICategoria } from "../../../database/entities/ICategorias"



interface ICategory {

    save(userId: number, data : ICategoria) : Promise<ICategoria |  { error : string}>
    update(userId: number,id : number, data : Partial<ICategoria>) : Promise<ICategoria |  { error : string}>
    delete(userId: number,id : number) : Promise<void | { error : string}>
    show(categoryId : number) :  Promise<ICategoria |  { error : string}>
    all() :  Promise<ICategoria[] |  { error : string}>

}

export { ICategory }