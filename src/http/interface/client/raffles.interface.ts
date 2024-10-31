import { IInscricoes } from "../../../database/entities/IInscricoes";
import { ISorteio } from "../../../database/entities/ISorteio";


interface IRafflesInterface {
    save(data : ISorteio) : Promise<ISorteio[]  | { error : string}>
    update (sorteioId : number, data : Partial<ISorteio>) : Promise<ISorteio | { error : string} >
    showAllAvaliable() : Promise<ISorteio[] | { error : string}>
    showOneById(sorteioId:number) : Promise<any | { error : string} >
    showAllByUserId(userId:number) : Promise<ISorteio[] | { error : string} >
    delete(sorteioId:number) : Promise<ISorteio[] | { error : string}>
    draw(sorteioId : number,categoriaId:number) : Promise<IInscricoes[] | { error : string}>
    winners(sorteioId : string,categoriaId:number) : Promise<{pdfUrl : string} | { error : string}>
}

export {IRafflesInterface};