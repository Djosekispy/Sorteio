import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../../@types/express";
import { IComplaint } from "../../interface/client/complaints.interface";


class ComplaintController { 
    constructor(private complaintService: IComplaint) {}
     saveComplaint = async (req: IGetUserAuthInfoRequest, res: Response) => {
        const { titulo, conteudo, sorteioId } = req.body
        const userId = req.userId as number
        const response = await this.complaintService.saveComplaint({ titulo, conteudo, sorteioId, usuarioId: userId })
        if('error' in Object(response)) return res.status(400).json({ error: response?.error })
        return res.status(200).json({message: "Reclamação enviada com sucesso", response})
    }
    getComplaints = async (req: IGetUserAuthInfoRequest, res: Response) => {
        const response = await this.complaintService.getComplaints()
        if('error' in response) return res.status(400).json({ error: response.error })
        return res.status(200).json({message: "Reclamações encontradas com sucesso", response})
    }
    getComplaintsByRaffle = async (req: IGetUserAuthInfoRequest, res: Response) => {
        const { sorteioId } = req.params
        const response = await this.complaintService.getComplaintsByRaffle(Number(sorteioId))
        if('error' in response) return res.status(400).json({ error: response.error })
        return res.status(200).json({message: "Reclamações encontradas com sucesso", response})
    }
    getComplaintsByUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
        const userId = req.userId as number
        const response = await this.complaintService.getComplaintsByUser(userId)
        if('error' in response) return res.status(400).json({ error: response.error })
        return res.status(200).json({message: "Reclamações encontradas com sucesso", response})
    }
    respondComplaint = async (req: IGetUserAuthInfoRequest, res: Response) => {
        const { complaintId } = req.params
        const { resposta } = req.body
        const response = await this.complaintService.respondComplaint(Number(complaintId), resposta)
        if('error' in Object(response)) return res.status(400).json({ error: response?.error })
        return res.status(200).json({message: "Reclamação respondida com sucesso"})
    }
}

export default ComplaintController;

