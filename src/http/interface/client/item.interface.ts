import { IItens } from "../../../database/entities/IItens"


interface IItem {
    save : (userId:number,data:IItens) => Promise<IItens | { error : string }>
    delete : (userId:number,id:number) => Promise<void | { error : string }>
    update : (userId:number,id:number,data:Partial<IItens>) => Promise<IItens | { error : string }>    
}

export { IItem }

