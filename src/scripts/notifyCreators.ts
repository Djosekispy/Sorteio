import prisma from "../config/database";
import Mailer from "../http/utils/email";

export const notifyDrawCreators = async (): Promise<{ success: boolean; message: string } | { success: boolean; error: string }> => {
    try {
       
        const sorteios = await prisma.sorteio.findMany({
            where: {
                status: 'corrente', 
            },
            include: {
                organizador: true, 
                categorias: {
                    include: {
                        itens: {
                            include: {
                                inscricoes: true, 
                            },
                        },
                    },
                },
            },
        });

        for (const sorteio of sorteios) {

            const totalInscricoes = sorteio.categorias.reduce((acc, categoria) => {
                const totalPorCategoria = categoria.itens.reduce((sum, item) => sum + item.inscricoes.length, 0);
                return acc + totalPorCategoria;
            }, 0);

        
            if (sorteio.organizador) {
                await prisma.notificacao.create({
                    data: {
                        usuarioId: sorteio.organizador.id,
                        title: 'Resumo semanal do seu sorteio',
                        message: `Olá ${sorteio.organizador.nome_completo}, o sorteio "${sorteio.nome}" possui atualmente ${totalInscricoes} inscrições.`,
                    },
                });
                await  Mailer.SendEmail(sorteio.organizador.email,'Resumo semanal do seu sorteio',`Olá ${sorteio.organizador.nome_completo}, o sorteio "${sorteio.nome}" possui atualmente ${totalInscricoes} inscrições.`)
                console.log(`Notificação enviada para o organizador do sorteio "${sorteio.nome}": ${sorteio.organizador.email}`);
            }
        }

        return { success: true, message: 'Notificações enviadas aos organizadores dos sorteios.' };
    } catch (error) {
        console.error('Erro ao notificar os organizadores dos sorteios:', error);
        return { success: false, error: 'Erro ao enviar notificações aos organizadores.' };
    }
};
