import { EstadoCandidatura, StatusSorteio } from "@prisma/client";
import prisma from "../../config/database";


 class JobsRepository {

    async getCurrentRaffles () {
        return await prisma.sorteio.findMany({
            where: {
                status: 'corrente',
                data_realizacao: new Date(),
            },
            include: {
                organizador : true,
                categorias: {
                    include: {
                        itens: { include: { inscricoes: true } },
                    },
                },
            },
        });
    }

    async updateWinnerStatus (id : number, status : EstadoCandidatura) {
     return   await prisma.inscricao.update({
            where: { id: id },
            data: { estado_candidatura: status },
        });

    }
   async updateRaffleStatus (id : number, status : StatusSorteio) {    
    return await prisma.sorteio.update({
            where: { id: id },
            data: { status: status },
        });
    }

  async findWinner (winnerId : number) {
    return  await prisma.usuario.findUnique({ where: { id: winnerId } });
  }

  async saveNotification (userId : number, title : string, message : string) {
    return await prisma.notificacao.create({
            data: {
                usuarioId: userId,
                title: title,
                message: message,
            },
        });
  }
}

const JobsRepositoryInstance = new JobsRepository();
export default JobsRepositoryInstance;