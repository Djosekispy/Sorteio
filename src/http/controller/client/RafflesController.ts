import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../../../@types/express";
import { IRafflesInterface } from "../../interface/client/raffles.interface";
import { StatusSorteio } from "@prisma/client";


class RafflesController {
   constructor(private rafflesService : IRafflesInterface){}

   save = async (req : IGetUserAuthInfoRequest, res : Response) => {
    const userId = req.userId as number ;
    const {nome,data_realizacao,politicas} = req.body;
    const cover = req.downloadURL as string
    const result = await this.rafflesService.save({nome,data_realizacao,politicas, organizadorId : userId,status : StatusSorteio.corrente, cover});
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Sorteio criado com sucesso',
        result
    });
   }
   update = async (req : IGetUserAuthInfoRequest, res : Response) => {
    const {sorteioId} = req.params;
    const {nome,data_realizacao,politicas} = req.body;
    const cover = req.downloadURL as string
    const result = await this.rafflesService.update(Number(sorteioId),{nome,data_realizacao,politicas,cover});
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Sorteio atualizado com sucesso',
        result
    });
   } 
   showAllAvaliable = async (req : Request, res : Response) => {
    const result = await this.rafflesService.showAllAvaliable();
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Sorteios disponíveis',
        result
    });
   }  
   showOneById = async (req : Request, res : Response) => {
    const {sorteioId} = req.params;
    const result = await this.rafflesService.showOneById(Number(sorteioId));
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Sorteio encontrado',
        result
    });
   }
   showAllByUserId = async (req : IGetUserAuthInfoRequest, res : Response) => {
    const userId = req.userId as number;
    const result = await this.rafflesService.showAllByUserId(userId);
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Sorteios encontrados',
        result
    });
   }    
   delete = async (req : IGetUserAuthInfoRequest, res : Response) => {
    const {sorteioId} = req.params;
    const userId = req.userId as number;
    const result = await this.rafflesService.delete(Number(sorteioId),userId);
    if('error' in result) return res.status(401).json({message : result.error});
    return res.status(200).json({
        message : 'Sorteio deletado com sucesso',
        result
    });
   }    
   draw = async (req : IGetUserAuthInfoRequest, res : Response) => {
    const {sorteioId} = req.params;
    const {categoriaId} = req.body;
    const userId = req.userId as number;
    const result = await this.rafflesService.draw(Number(sorteioId),Number(categoriaId),userId);
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Sorteio realizado com sucesso',
        result
    });
   }    
   winners = async (req : IGetUserAuthInfoRequest, res : Response) => {
    const {sorteioId} = req.params;
    const {categoriaId} = req.body;
    const userId = req.userId as number;
    const result = await this.rafflesService.winners(sorteioId,categoriaId,userId);
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Vencedores encontrados',
        result
    });
   }  
   participate = async (req : IGetUserAuthInfoRequest, res : Response) => {
    const {sorteioId} = req.params;
    const {ItemId} = req.body;
    const userId = req.userId as number;
    const result = await this.rafflesService.participate(Number(sorteioId),Number(ItemId),userId);
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Inscrição realizada com sucesso',
        result
    });
   }   
   cancelParticipation = async (req : IGetUserAuthInfoRequest, res : Response) => {
    const {inscricaoId} = req.params;
    const userId = req.userId as number;
    const result = await this.rafflesService.cancelParticipation(Number(inscricaoId),userId);
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Inscrição cancelada com sucesso',
        result
    });
   }   
   updateCandidateStatus = async (req: Request, res : Response )=>{
    const { inscricaoId, status  } = req.body;
    const result = await this.rafflesService.updateCandidateStatus(parseInt(String(inscricaoId)), status);
    if('error' in result) return res.status(400).json({message : result.error});
    return res.status(200).json({
        message : 'Estado de candidatura alterado com sucesso',
        result
    });
   }
    searchRaffle = async (req : Request, res : Response) => {
     const {string} = req.params;
     const result = await this.rafflesService.searchRaffle(string);
     if('error' in result) return res.status(400).json({message : result.error});
     return res.status(200).json({
          message : 'Sorteios encontrados',
          result
     });
    }
}

export default RafflesController;