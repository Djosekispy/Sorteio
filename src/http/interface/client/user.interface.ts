import { IDocumentos } from "../../../database/entities/IDocumentos"
import { IInscricoes } from "../../../database/entities/IInscricoes"
import { INotificacao } from "../../../database/entities/INotificacao"
import { IUsuario } from "../../../database/entities/IUsuario"


interface IUser {

    show(userId : number) : Promise<IUsuario | { error : string}>
    update(userId : number,data : IUsuario) : Promise<IUsuario | { error : string }>
    requestChange(userId : number) : Promise<void | { error : string}>
    showParticipationsHistory(userId : number) : Promise<IInscricoes[] | { error : string}>
    getNotifications(userId : number) : Promise<INotificacao[]>
    loadDocuments(data : IDocumentos) : Promise<any | { error : string}>
    updateDocument(id : number,data : IDocumentos) : Promise<any | { error : string}>
}

export { IUser }