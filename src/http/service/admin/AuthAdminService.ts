import { IAdministrador } from "../../../database/entities/IAdministrador";
import Administrador from "../../../database/model/administrador";
import { IAuthAdmin, LoginReturnaAdmin } from "../../interface/admin/AuthAdmin";
import bcrypt from 'bcrypt'
import { generateTokenAdmin } from "../../middleware/adminToken";

class AuthAdminService implements IAuthAdmin {
    async registrar(dados : IAdministrador ) : Promise<IAdministrador | { error : string } >
    {
       try {
           dados.senha = bcrypt.hashSync(dados.senha,10)
           const registerUser = new Administrador(dados);
           const userEmailExistis = await Administrador.findByEmail(dados.email)
           if(userEmailExistis ){
               return { error : "Ops! Tente outros dados"}
           }
           await registerUser.save();
   
           return await Administrador.findByEmail(dados.email) as IAdministrador
       } catch (error) {
           return { error : 'Algo Inesperado! Tente mais tarde : ' + error }
           
       }
    }
    async entrar(email : string, senha : string):Promise<LoginReturnaAdmin | { error : string } >
    {
       try {
           const user = await Administrador.findByEmail(email);
           if(!user){
               return { error : 'Usuario não existe'}
           }
   
           const isMatch = bcrypt.compareSync(senha,user.senha)
           if(!isMatch){
               return { error : 'Credenciais Inválidas'}
           }
           const token = await generateTokenAdmin({ id : user.id})
   
           const dataToReturn = {
               user : await Administrador.findByEmail(email),
               token : token
           }
           return dataToReturn as LoginReturnaAdmin
       } catch (error) {
           return { error : 'Algo deu errado! Tente mais tarde ' + error}
       }
    }

    async sair(userId : number) : Promise<void | { error : string } >
    {
       try {
           const user = await Administrador.findById(userId)
           if(!user){
               return { error : 'Usuário não existe!'}
           }
           await Administrador.update(userId,{token_acesso : ''})
       } catch (error) {
           return { error : 'Algo deu errado : ' + error }
       }
    }
}

export default AuthAdminService;