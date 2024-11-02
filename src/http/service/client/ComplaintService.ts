import { IReclamacao } from "../../../database/entities/IReclamacao";
import Reclamacao from "../../../database/model/reclamacao";
import Sorteio from "../../../database/model/sorteio";
import { IComplaint } from "../../interface/client/complaints.interface";



class ComplaintService implements IComplaint {
 
   async  saveComplaint(complaint: IReclamacao): Promise<void | { error: string }> {
       try {
      const raffle = await Sorteio.findById(complaint.sorteioId)
      if(!raffle) return { error: "Sorteio não encontrado" }
      const newComplaint = new Reclamacao(complaint)
      await newComplaint.save()
   
       } catch (error) {
        return { error: 'Erro ao salvar reclamação' + error }
       }
    }
    async getComplaints(): Promise<IReclamacao[] | { error: string }> {
        try {
            const complaints = await Reclamacao.find()
            if(!complaints) return { error: "Nenhuma reclamação encontrada" }
            return complaints
        } catch (error) {
            return { error: 'Erro ao buscar reclamações' + error }
        }
    }
    async getComplaintsByRaffle(raffleId: number): Promise<IReclamacao | { error: string }> {
        try {
            const complaints = await Reclamacao.findById(raffleId)
            if(!complaints) return { error: "Reclamação não encontrada" }
            return complaints 
        } catch (error) {
            return { error: 'Erro ao buscar reclamações' + error }
        }
    }
}


export default ComplaintService;