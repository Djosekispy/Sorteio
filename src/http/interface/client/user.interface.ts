import { IInscricoes } from "../../../database/entities/IInscricoes"
import { IUsuario } from "../../../database/entities/IUsuario"


interface IUser {

    show(userId : number) : Promise<IUsuario | { error : string}>
    update(userId : number,data : IUsuario) : Promise<IUsuario | { error : string }>
    requestChange(userId : number) : Promise<void | { error : string}>
    showParticipationsHistory(userId : number) : Promise<IInscricoes[] | { error : string}>
}

export { IUser }