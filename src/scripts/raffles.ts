import { notifyParticipants } from "./notifyParticipants";
import JobsRepositoryInstance from "./repositoryJobs/JobsRepository";

export const performDailyDraw = async (): Promise<any> => {
    try {
        const sorteios = await JobsRepositoryInstance.getCurrentRaffles();

        const resultados = [];

        for (const sorteio of sorteios) {
            const winners: Array<{ id: number; usuarioId: number }> = [];

            for (const categoria of sorteio.categorias) {
                for (const item of categoria.itens) {
                    const approved = item.inscricoes.filter(
                        inscricao => inscricao.estado_candidatura === 'aprovado'
                    );

                    if (approved.length > 0) {
                        const winner =
                            approved[Math.floor(Math.random() * approved.length)];
                        
                           await JobsRepositoryInstance.updateWinnerStatus(winner.id, 'ganho');
                 
                        winners.push({ id: winner.id, usuarioId: winner.usuarioId });
                    }
                }
            }

            const notificationResult = await notifyParticipants(winners);
            console.log('Resultado da notificação:', notificationResult);

            await JobsRepositoryInstance.updateRaffleStatus(sorteio.id, 'finalizado');
            resultados.push({ sorteioId: sorteio.id, winners });
        }

        return resultados;
    } catch (error) {
        console.error('Erro ao realizar sorteio:', error);
        return { error: 'Erro ao realizar sorteio.' };
    }
};
