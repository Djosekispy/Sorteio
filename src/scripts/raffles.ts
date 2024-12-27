import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

const performDailyDraw = async () => {
    try {
        const today = dayjs().startOf('day').toDate();

        const sorteios = await prisma.sorteio.findMany({
            where: {
                data_realizacao: today,
                status: 'corrente'
            },
            include: {
                categorias: {
                    include: {
                        itens: {
                            include: {
                                inscricoes: {
                                    where: { estado_candidatura: 'aprovado' }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!sorteios || sorteios.length === 0) {
            console.log('Nenhum sorteio agendado para hoje.');
            return { message: 'Nenhum sorteio agendado para hoje.' };
        }

        const results : { sorteioId: number; categorias: never[]}[]  = [];

        await prisma.$transaction(async (tx) => {
            for (const sorteio of sorteios) {
                const sorteioResult = { sorteioId: sorteio.id, categorias: [] };

                for (const categoria of sorteio.categorias) {
                    const categoriaResult = { categoriaId: categoria.id, winners:[] };

                    for (const item of categoria.itens) {
                        const { inscricoes } = item;

                        if (inscricoes.length > 0) {
                            const winner = inscricoes[Math.floor(Math.random() * inscricoes.length)];
                            await tx.inscricao.update({
                                where: { id: winner.id },
                                data: { estado_candidatura: 'ganho' }
                            });

                            (categoriaResult.winners as any).push({
                                itemId: item.id,
                                inscricaoId: winner.id,
                                usuarioId: winner.usuarioId
                            });
                        }
                    }

                    (sorteioResult.categorias as any).push(categoriaResult);
                }
                await tx.sorteio.update({
                    where: { id: sorteio.id },
                    data: { status: 'finalizado' }
                });

                results.push(sorteioResult);
            }
        });

        console.log('Sorteio diário concluído:', results);
        return { message: 'Sorteio diário concluído.', results };
    } catch (error) {
        console.error('Erro ao realizar o sorteio diário:', error);
        return { error: 'Algo deu errado: ' + error };
    }
};

export default performDailyDraw;