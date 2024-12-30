import { EstadoNotificacao } from "@prisma/client";
import Notificacao from "../../database/model/notificacao";
import JobsRepositoryInstance from "../../scripts/repositoryJobs/JobsRepository";
import Mailer from "./email";


export default async function NotifyParticipantsForRafflesUpdates(raffleId : number){
    try {
        const raffle = await JobsRepositoryInstance.findRaffle(raffleId);
        const participants = await JobsRepositoryInstance.findParticipants(raffleId);

        for (const participant of participants) {
            await JobsRepositoryInstance.saveNotification(participant.id, 'Atualização no sorteio!', `Olá ${participant.usuario.nome_completo}, o sorteio ${raffle?.nome} foi atualizado!`);
            await Mailer.SendEmail(participant.usuario.email, 'Atualização no sorteio!', `Olá ${participant.usuario.nome_completo}, o sorteio ${raffle?.nome} foi atualizado!`);
            const notifyData = {
                title : `Actualização do sorteio ${raffle?.nome}`,
                message : `Algumas informações so sorteio ${raffle?.nome} em que está participando foram actualizadas. Verifique as informações do sorteio para mais detalhes.`,
                usuarioId : participant.usuario.id,
                status : EstadoNotificacao.pendente
    
            }
            const notificar = new Notificacao(notifyData)
            await notificar.save()
            console.log(`Notificação enviada para: ${participant.usuario.email}`);
        }

        return { success: true, message: 'Notificações enviadas com sucesso.' };
    }catch(err){
        console.error(err);
        return { success: false, message: 'Ocorreu um erro ao enviar as notificações.' };
    }
}