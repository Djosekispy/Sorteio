import { IReclamacao } from "../../../database/entities/IReclamacao"



interface IComplaint {
    saveComplaint: (complaint: IReclamacao) => Promise<void | { error: string }>
    getComplaints: () => Promise<IReclamacao[] | { error: string }>
    getComplaintsByRaffle: (raffleId: number) => Promise<IReclamacao | { error: string }>
    getComplaintsByUser: (userId: number) => Promise<IReclamacao[] | { error: string }>
    respondComplaint: (complaintId: number, response: string) => Promise<void | { error: string }>
}

export { IComplaint }

