
import cron from 'node-cron';
import performDailyDraw from '../scripts/raffles';

export const initializeJobs = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Executando sorteio diário...');
        const resultado = await performDailyDraw();
        console.log(resultado);
    });

    console.log('Tarefas agendadas inicializadas');
};
