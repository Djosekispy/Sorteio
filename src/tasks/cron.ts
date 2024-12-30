
import cron from 'node-cron';
import { performDailyDraw } from '../scripts/raffles';
import { notifyDrawCreators } from '../scripts/notifyCreators';

const initializeJobs = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Executando sorteio diário...');
        const resultado = await performDailyDraw();
        console.log(resultado);
    });
    console.log('Tarefas agendadas inicializadas');
};

const NotifyCreatorsForCandidates = ()=>{
    cron.schedule('0 8 * * 1', async () => {
        console.log('Iniciando notificação semanal para organizadores de sorteios...');
        const resultado = await notifyDrawCreators();
        console.log('Resultado da notificação semanal:', resultado);
    });
    
} 

export  { initializeJobs, NotifyCreatorsForCandidates };