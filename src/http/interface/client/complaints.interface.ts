import { IReclamacao } from "../../../database/entities/IReclamacao"



interface IComplaint {
    saveComplaint: (complaint: IReclamacao) => Promise<void | { error: string }>
    getComplaints: () => Promise<IReclamacao[] | { error: string }>
    getComplaintsByRaffle: (raffleId: number) => Promise<IReclamacao | { error: string }>
}

export { IComplaint }

