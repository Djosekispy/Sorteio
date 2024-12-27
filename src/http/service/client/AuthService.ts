import { IUsuario } from "../../../database/entities/IUsuario";
import Usuario from "../../../database/model/usuario";
import { IAuthUser, LoginReturn } from "../../interface/client/auth.interface";
import bcrypt from 'bcrypt'
import { generateToken } from "../../middleware/token";
import Mailer from "../../utils/email";
import { randomDigits } from "../../utils/generateRandomNumber";

class AuthService implements IAuthUser {

 async registrar(dados : IUsuario) : Promise<IUsuario | { error : string } >
 {
    try {
        dados.senha = bcrypt.hashSync(dados.senha,10)
        const registerUser = new Usuario(dados);
        const userEmailExistis = await Usuario.findByEmail(dados.email)
       // const userPhoneNumberExistis = await Usuario.findByPhoneNumber(dados.telefone)
        if(userEmailExistis){
            return { error : "Ops! Tente outros dados"}
        }
        await registerUser.save();

        return await Usuario.findByEmail(dados.email) as IUsuario
    } catch (error) {
        return { error : 'Algo Inesperado! Tente mais tarde : ' + error }
        
    }
 }
 async entrar(email : string, senha : string):Promise<LoginReturn | { error : string } >
 {
    try {
        const user = await Usuario.findByEmail(email);
        if(!user){
            return { error : 'Usuario não existe'}
        }

        const isMatch = bcrypt.compareSync(senha,user.senha)
        if(!isMatch){
            return { error : 'Credenciais Inválidas'}
        }
        const token = await generateToken({ id : user.id})

        const dataToReturn = {
            user : await Usuario.findByEmail(email),
            token : token
        }
        return dataToReturn as LoginReturn
    } catch (error) {
        return { error : 'Algo deu errado! Tente mais tarde ' + error}
    }
 }
 async esqueceuSenha(email : string) : Promise<IUsuario| { error : string } >
 {
    try {
        const getUserData = await Usuario.findByEmail(email)
        if(!getUserData){
            return { error : 'Usuario não existe'}
        }
        const code = randomDigits
        await Usuario.update(getUserData.id,{ codigo_recuperacao : parseInt(code)})
        const content = `Vamos ajuda-lo a recuperar a sua conta, use o código : ${code}`
      const sendingEmail =  await  Mailer.SendEmail(email,'Reposição de Senha - SorteioApp',content)
       if(!sendingEmail.accepted){
        throw new Error("E-mail não enviado para - " + sendingEmail.envelope.to);
        
       }
       return await Usuario.findByEmail(email) as IUsuario
    } catch (error) {
        return { error : '' + error }
    }
 }
 async redefinirSenha(email : string, senha : string) : Promise<IUsuario | { error : string } >
 {
    try {
        const getUserData = await Usuario.findByEmail(email)
        if(!getUserData){
            return { error : 'Usuario não existe'}
        }
        const passwordHashed = bcrypt.hashSync(senha,10)
        await Usuario.update(getUserData.id, { senha : passwordHashed})
        return await Usuario.findByEmail(email) as IUsuario
    } catch (error) {
        return { error : 'Algo de errado ' + error}
        
    }
 }
 async sair(userId : number) : Promise<void | { error : string } >
 {
    try {
        const user = await Usuario.findById(userId)
        if(!user){
            return { error : 'Usuário não existe!'}
        }
        await Usuario.update(userId,{token_acesso : ''})
    } catch (error) {
        return { error : 'Algo deu errado : ' + error }
    }
 }
}


export default AuthService;