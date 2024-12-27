import prisma from "../config/database";
import { notifyParticipants } from "./notifyParticipants";

export const performDailyDraw = async (): Promise<any> => {
    try {
        const sorteios = await prisma.sorteio.findMany({
            where: {
                status: 'corrente',
                data_realizacao: new Date(),
            },
            include: {
                categorias: {
                    include: {
                        itens: { include: { inscricoes: true } },
                    },
                },
            },
        });

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
                        
                        await prisma.inscricao.update({
                            where: { id: winner.id },
                            data: { estado_candidatura: 'ganho' },
                        });

                        winners.push({ id: winner.id, usuarioId: winner.usuarioId });
                    }
                }
            }

            const notificationResult = await notifyParticipants(winners);
            console.log('Resultado da notificação:', notificationResult);

            await prisma.sorteio.update({
                where: { id: sorteio.id },
                data: { status: 'finalizado' },
            });

            resultados.push({ sorteioId: sorteio.id, winners });
        }

        return resultados;
    } catch (error) {
        console.error('Erro ao realizar sorteio:', error);
        return { error: 'Erro ao realizar sorteio.' };
    }
};
