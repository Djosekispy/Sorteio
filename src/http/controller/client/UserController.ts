import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../../../@types/express";
import { IUser } from "../../interface/client/user.interface";


class UserController {
    constructor(private userService : IUser){}
    getUser = async(req: IGetUserAuthInfoRequest, res:Response)=>{
        const userId = req.userId
        const user = await this.userService.show(userId as number);
        if('error' in user){
            return res.status(404).json({message : user.error})
        }
        return res.status(201).json(user)
    }

    showOneUser = async(req: Request, res:Response)=>{
        const { id } = req.params 
        const user = await this.userService.show(parseInt(id));
        if('error' in user){
            return res.status(404).json({message : user.error})
        }
        return res.status(201).json(user)
    }

    updateUser = async(req: IGetUserAuthInfoRequest, res:Response)=>{
        const userId = req.userId
        const data = req.body
        const user = await this.userService.update(userId as number,data);
        if('error' in user){
            return res.status(404).json({message : user.error})
        }
        return res.status(201).json({
            message : 'Informações actualizadas com sucesso',
            user
        })
    }
    updateUserPhoto = async(req: IGetUserAuthInfoRequest, res:Response)=>{
        const userId = req.userId
        const  downloadURL  = req.downloadURL;
        const data = { ...req.body, foto_perfil: downloadURL };
        const user = await this.userService.update(userId as number, data);
        if('error' in user){
            return res.status(404).json({message : user.error})
        }
        return res.status(201).json({
            message : 'Informações actualizadas com sucesso',
            user
        })
    }

 changeProfileStatus = async(req: IGetUserAuthInfoRequest, res:Response)=>{
        const userId = req.userId
        const user = await this.userService.requestChange(userId as number);
        if('error' in Object(user)){
            return res.status(404).json({message : user?.error})
        }
        return res.status(201).json({
            message : 'Solicitação enviada com sucesso'
        })
    }

    getHistory = async(req: IGetUserAuthInfoRequest, res:Response)=>{
        const userId = req.userId
        const user = await this.userService.showParticipationsHistory(userId as number);
        if('error' in user){
            return res.status(404).json({message : user.error})
        }
        return res.status(201).json({
            message : 'Registro de Inscrições',
            user
        })
    }


    
}

export default UserController;