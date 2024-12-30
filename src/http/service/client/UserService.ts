import { IDocumentos } from "../../../database/entities/IDocumentos";
import { IInscricoes } from "../../../database/entities/IInscricoes";
import { INotificacao } from "../../../database/entities/INotificacao";
import { IUsuario } from "../../../database/entities/IUsuario";
import Documento from "../../../database/model/documentos";
import Inscricao from "../../../database/model/inscricoes";
import Notificacao from "../../../database/model/notificacao";
import Pedido from "../../../database/model/pedido";
import Usuario from "../../../database/model/usuario";
import { IUser } from "../../interface/client/user.interface";



class UserService implements IUser {

   async show(userId : number) : Promise<IUsuario | { error : string}>
    {
        try {
            const user = await Usuario.findById(userId)
            if(!user){
                return { error : 'Usuário não existe'}
            }
            return user as IUsuario;
        } catch (error) {
            return { error : 'Algo deu errado : ' + error}
        }
    }
    async update(userId : number,data : IUsuario) : Promise<IUsuario | { error : string }>
    {
        try {
            const user = await Usuario.findById(userId);
            const dados = { ...data };
            if(!user){
                return { error : 'Usuário não existe'}
            }
            await Usuario.update(user.id,dados)
            return await Usuario.findById(userId) as IUsuario
        } catch (error) {
            return { error : 'Algo deu errado : ' + error}
        }
    }
    async requestChange(userId : number) : Promise<void | { error : string}>
    {
        try {
            const user = await Usuario.findById(userId);
            if(!user){
                return { error : 'Usuário não existe'}
            }
            const sms = "Preciso que o meu perfil seja alterado para Entidade"
            const feedback = new Pedido({usuarioId : userId,content : sms})
            await feedback.save();
        } catch (error) {
            return { error : 'Algo deu errado' + error }
        }
    }
    async showParticipationsHistory(userId : number) : Promise<IInscricoes[] | { error : string}>
    {
        try {
            const user = await Usuario.findById(userId);
            const history = await Inscricao.findByUserId(user?.id as number)
            if(!user){
                return { error : 'Usuário não existe'}
            }
          if(!history){
          return  { error : 'Histórico Vazio'}
          }
          return history;
        } catch (error) {
            return { error : 'Algo deu errado '  + error }
        }
    }
 async  getNotifications(userId : number) : Promise<INotificacao[]> {
    return await Notificacao.findByUserId(userId)
 }

 async   loadDocuments(data : IDocumentos) : Promise<any | { error : string}> {
    try {
        const user = await Usuario.findById(data.usuarioId)
        if(!user){
            return { error : 'Usuário não existe'}
        }
        const findDocument  = await Documento.findByUserId(user.id)
        if(findDocument.length > 0) {
             return { error : 'Documentos já carregados! Tente actualiza-los'}
        }
        const saveDocument = new  Documento(data);
        await saveDocument.save();
        return saveDocument;
    } catch (error) {
        return { error : 'Algo deu errado '  + error }
 }
}

async updateDocument(id : number,data : IDocumentos) : Promise<any | { error : string}> {
    try {
        const user = await Documento.findById(id)
        if(!user){
            return { error : 'Registro  não existe'}
        }
        await Documento.update(id,data);
        return await Documento.findById(id) ;
    } catch (error) {
        return { error : 'Algo deu errado '  + error }
 }
}
}



export default UserService;