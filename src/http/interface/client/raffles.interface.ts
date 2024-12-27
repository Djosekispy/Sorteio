import { EstadoCandidatura } from "@prisma/client";
import { IInscricoes } from "../../../database/entities/IInscricoes";
import { ISorteio } from "../../../database/entities/ISorteio";


interface IRafflesInterface {
    save(data : ISorteio) : Promise<ISorteio[]  | { error : string}>
    update (sorteioId : number, data : Partial<ISorteio>) : Promise<ISorteio | { error : string} >
    showAllAvaliable() : Promise<ISorteio[] | { error : string}>
    showOneById(sorteioId:number) : Promise<any | { error : string} >
    showAllByUserId(userId:number) : Promise<ISorteio[] | { error : string} >
    delete(sorteioId:number,userId: number) : Promise<ISorteio[] | { error : string}>
    draw(sorteioId : number,categoriaId:number,userId: number) : Promise<IInscricoes[] | { error : string}>
    winners(sorteioId : string,categoriaId:number,userId: number) : Promise<{pdfUrl : string} | { error : string}>
    participate(sorteioId : number,ItemId:number,userId: number) : Promise<IInscricoes[] | { error : string}>
    cancelParticipation(inscricaoId:number,userId:number) : Promise<IInscricoes[] | { error : string}>
    updateCandidateStatus(inscricaoId:number,status:EstadoCandidatura) : Promise<IInscricoes[] | { error : string}>
    searchRaffle(string : string) : Promise<ISorteio[] | { error : string}>;
}

export {IRafflesInterface};