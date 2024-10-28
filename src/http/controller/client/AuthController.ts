import { Request, Response } from 'express';
import { IAuthUser } from "../../interface/client/auth.interface";
import { IGetUserAuthInfoRequest } from '../../../@types/express';


class AuthController {
    
    constructor(private authService: IAuthUser) {}


    cadastrar = async(req : Request, res : Response)=>{
        const data = req.body
        const save = await this.authService.registrar(data)
        if('error' in save){
            return res.status(400).json({ message : save.error})
        }
        return res.status(201).json({
            message : 'Cadastro feito com sucesso',
            user : save
        })
    }

    login = async(req : Request, res : Response)=>{
        const {email, senha} = req.body
        const logar = await this.authService.entrar(email,senha)
        if('error' in logar){
            return res.status(400).json({ message : logar.error})
        }
        return res.status(201).json({
            message : 'Login feito com sucesso',
            user : logar.user,
            token : logar.token
        })
    }
    perdeuSenha = async(req : Request, res : Response)=>{
        const { email } = req.body;
        const sendingEmail = await this.authService.esqueceuSenha(email);
        if('error' in sendingEmail){
            return res.status(401).json({message : sendingEmail.error})
        }
        return res.status(201).json({
            message : 'Verifique a sua caixa de E-mail',
            user : sendingEmail
        })
    }

    reporSenhaPerdida = async(req : Request, res : Response)=>{
        const { email , senha } = req.body
        const newPassword = await this.authService.redefinirSenha(email,senha)
        if('error' in newPassword){
            return res.status(400).json({ message : newPassword.error})
        }
        return res.status(201).json({
            message : 'Senha Redefinida com sucesso',
            user : newPassword
        })
    }
    logout = async(req : IGetUserAuthInfoRequest, res : Response)=>{
        const id = req.userId as number
        const loginOut = await this.authService.sair(id)
        if('error' in Object(loginOut)){
            return res.status(400).json({ message : loginOut?.error})
        }
        return res.status(201).json({
            message : 'Logout feito com sucesso',
        })
    }

}

export default AuthController;