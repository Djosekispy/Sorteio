import { IInscricoes } from "../../../database/entities/IInscricoes";
import { IUsuario } from "../../../database/entities/IUsuario";
import Inscricao from "../../../database/model/inscricoes";
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

}



export default UserService;