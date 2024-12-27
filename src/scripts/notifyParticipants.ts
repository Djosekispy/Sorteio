import Mailer from "../http/utils/email";
import JobsRepositoryInstance from "./repositoryJobs/JobsRepository";

export const notifyParticipants = async (winners: Array<{ usuarioId: number }>): Promise<{ success: boolean; message: string } | { success: boolean; error: string }> => {
    try {
        for (const winner of winners) {
            const user = await JobsRepositoryInstance.findWinner(winner.usuarioId); 
            
            if (user) {
                await JobsRepositoryInstance.saveNotification(user.id, 'Parabéns! Você ganhou no sorteio!', `Olá ${user.nome_completo}, você foi um dos vencedores no sorteio!`);
              await  Mailer.SendEmail(user.email,'Parabéns! Você ganhou no sorteio!',`Olá ${user.nome_completo}, você foi um dos vencedores no sorteio!`)
                console.log(`Notificação enviada para: ${user.email}`);
            }
        }

        return { success: true, message: 'Notificações enviadas com sucesso.' };
    } catch (error) {
        console.error('Erro ao notificar participantes:', error);
        return { success: false, error: 'Erro ao enviar notificações.' };
    }
};
