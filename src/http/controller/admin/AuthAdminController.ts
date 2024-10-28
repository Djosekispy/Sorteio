import { Request, Response } from "express";
import { IAuthAdmin } from "../../interface/admin/AuthAdmin";
import { IGetUserAuthInfoRequest } from "../../../@types/express";


class AuthAdminController {

    constructor(private authAdminService : IAuthAdmin){}

    cadastrar = async(req : Request, res : Response)=>{
        const data = req.body
        const save = await this.authAdminService.registrar(data)
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
        const logar = await this.authAdminService.entrar(email,senha)
        if('error' in logar){
            return res.status(400).json({ message : logar.error})
        }
        return res.status(201).json({
            message : 'Login feito com sucesso',
            user : logar.user,
            token : logar.token
        })
    }

    logout = async(req : IGetUserAuthInfoRequest, res : Response)=>{
        const id = req.userId as number
        const loginOut = await this.authAdminService.sair(id)
        if('error' in Object(loginOut)){
            return res.status(400).json({ message : loginOut?.error})
        }
        return res.status(201).json({
            message : 'Logout feito com sucesso',
        })
    }
}


export default AuthAdminController;