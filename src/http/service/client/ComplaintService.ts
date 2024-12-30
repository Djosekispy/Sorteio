import Reclamacao from "../../../database/model/reclamacao";
import { IReclamacao } from "../../../database/entities/IReclamacao";
import { IComplaint } from "../../interface/client/complaints.interface";
import Sorteio from "../../../database/model/sorteio";
import { IRafflesInterface } from "../../interface/client/raffles.interface";
import IEntitiesRepository from "../../repositoryInterfaces/IEntitiesRepository";


class ComplaintsService implements IComplaint
 {
    constructor(private entitiesRepository: IEntitiesRepository) {}
    async saveComplaint(complaint: IReclamacao) {
       try { 
        const newComplaint = new Reclamacao(complaint);
        const reffle = await Sorteio.findById(complaint.sorteioId);
        if(!reffle) {
            return { error: "Sorteio não encontrado" };
        }
        const raffle = await this.entitiesRepository.isOwner(complaint.usuarioId, complaint.sorteioId)        
        if(raffle) {
            return { error: "Não pode avaliar seu próprio sorteio" };
        }
        await newComplaint.save();
       } catch (error) {
        return { error: "Erro ao salvar reclamação" };
       }
    }

    async getComplaints() {
        try {
            const complaints = await Reclamacao.find();
            return complaints;
        } catch (error) {
            return { error: "Erro ao buscar reclamações" };
        }
    }

    async getComplaintsByRaffle(raffleId: number) {
        try {
            const complaints = await Reclamacao.findBySorteioId(raffleId);
            
            return complaints as any;
        } catch (error) {
            return { error: "Erro ao buscar reclamações do sorteio" };
        }
    }

    async getComplaintsByUser(userId: number) {
        try {
            const complaints = await Reclamacao.findByUserId(userId);
            if(!complaints) {
                return { error: "Nenhuma reclamação encontrada" };
            }
            return complaints;
        } catch (error) {
            return { error: "Erro ao buscar reclamações do usuário" };
        }
    }

    async respondComplaint(complaintId: number, response: string) {
        try {
            const complaint = await Reclamacao.findById(complaintId);
            if(!complaint) {
                return { error: "Reclamação não encontrada" };
            }
            await Reclamacao.update(complaintId, {
                updatedAt: new Date(), 
            });
        } catch (error) {
            return { error: "Erro ao responder reclamação" };
        }
    }
}

export default ComplaintsService;

