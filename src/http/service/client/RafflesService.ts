import { IInscricoes } from "../../../database/entities/IInscricoes";
import { ISorteio } from "../../../database/entities/ISorteio";
import Inscricao from "../../../database/model/inscricoes";
import Item from "../../../database/model/itens";
import Sorteio from "../../../database/model/sorteio";
import {IRafflesInterface } from "../../interface/client/raffles.interface";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import PDFDocument from 'pdfkit';
import { storagebucket } from "../../utils/firebase";
import IEntitiesRepository from "../../repositoryInterfaces/IEntitiesRepository";
import { EstadoCandidatura, EstadoNotificacao } from "@prisma/client";
import Notificacao from "../../../database/model/notificacao";
import Categoria from "../../../database/model/categoria";
import NotifyParticipantsForRafflesUpdates from "../../utils/notifyParticipantsForRafflesUpdate";

class RefflesService implements IRafflesInterface {

    constructor(private entitiesRepository: IEntitiesRepository){}
 save = async (data : ISorteio) : Promise<ISorteio[]  | { error : string}> => {
    try {
     
        const user = await this.entitiesRepository.isOrganizer(data.organizadorId)
       if(!user){
        return { error : 'Você não tem permissão para criar sorteios'}
       }
       data.data_realizacao = new Date(data.data_realizacao);
       const raffle = new Sorteio(data)
       await  raffle.save();
       return await Sorteio.findByUserId(data.organizadorId) as ISorteio[]; 
    } catch (error) {
        return { error : 'Algo deu errado : ' + error}
    }
 }
  update = async (sorteioId : number, data : Partial<ISorteio>) : Promise<ISorteio | { error : string} > => {
    try {
       
        const findRaffle = await Sorteio.findById(sorteioId)
        if(!findRaffle){
            return { error : 'Sorteio Inexistente'}
        }
        const user = await this.entitiesRepository.isOwner(findRaffle.organizadorId,sorteioId)
        if(!user){
         return { error : 'Você não tem permissão para actualizar este sorteio'}
        }
        await Sorteio.update(sorteioId,data)
        await NotifyParticipantsForRafflesUpdates(sorteioId);
        return await Sorteio.findById(sorteioId) as ISorteio
    } catch (error) {
        return { error : 'Algo deu errado : ' + error }
    }
 }

 showAllAvaliable = async () : Promise<ISorteio[] | { error : string}> => {
    try {
        const allData = await Sorteio.findAll();
        const rafflesAvaliable = allData.filter(item => item.status === 'corrente')
        if(!rafflesAvaliable){
            return { error : 'Nenhum Sorteio Disponível'}
        }
        return rafflesAvaliable as ISorteio[]
    } catch (error) {
        return { error : 'Algo deu errado ' + error}
    }
 }
 showOneById = async (sorteioId:number) : Promise<any | { error : string} > => {
    try {
        const reffle = await Sorteio.findById(sorteioId);

        if(!reffle){
            return { error : 'Sorteio Inexistente'}
        }
        return reffle 
    } catch (error) {
        return { error : 'Algo deu errado ' + error}
    }
 }

 showAllByUserId = async (userId:number) : Promise<ISorteio[] | { error : string} > => {
    try {
        const user = await  this.entitiesRepository.isOrganizer(userId)
        if(!user){
            return { error : 'Você não tem permissão para ver os sorteios deste usuário'}
        }
        const raffles = await Sorteio.findByUserId(userId);
        if(!raffles || raffles.length === 0) {
            return { error: 'Nenhum sorteio encontrado para este usuário' };
        }
        return raffles as ISorteio[];
    } catch (error) {
        return { error: 'Algo deu errado: ' + error };
    }
}

 delete = async (sorteioId:number,userId: number) : Promise<ISorteio[] | { error : string}> => {
    try {
      
        const raffle = await Sorteio.findById(sorteioId);
        if(!raffle) {
            return { error: 'Sorteio não encontrado' };
        }
        const user = await this.entitiesRepository.isOwner(userId,sorteioId)
        if(!user){
            return { error : 'Você não tem permissão para deletar este sorteio'}
        }
        await Sorteio.delete(sorteioId);
        return await Sorteio.findAll() as ISorteio[];
    } catch (error) {
        return { error: 'Algo deu errado: ' + error };
    }
}


 draw = async (sorteioId: number,categoriaId:number,userId: number): Promise<IInscricoes[] | { error: string }> => {
    try {
        const raffle = await Sorteio.findById(sorteioId);
        const user = await this.entitiesRepository.isOwner(userId,sorteioId)
        if(!user){
            return { error : 'Você não tem permissão para realizar este sorteio'}
        }
        if (!raffle) {
            return { error: 'Sorteio não encontrado' };
        }
        if (raffle.status !== 'corrente') {
            return { error: 'Este sorteio não está mais disponível' };
        }
        const items = await Item.findByCategory(categoriaId);
        const winners = [];
        if(!items || items.length === 0){
            return { error : 'Nenhum item encontrado para este sorteio'}
        }
        for (const item of items) {
          
           const aproved =  item.inscricoes.filter(select => select.estado_candidatura === 'aprovado');
           if(aproved.length > 0){
            const winner = aproved[Math.floor(Math.random() * aproved.length)];
           await Inscricao.update(winner.id,{estado_candidatura : 'ganho'});
            winners.push(winner);
           }
          
        }
        return winners;
    } catch (error) {
        return { error: 'Algo deu errado: ' + error };
    }
}

 winners = async (sorteioId: string, categoriaId: number,userId: number): Promise<{ pdfUrl: string } | { error: string }> => {
    try {
        const raffle = await Sorteio.findById(Number(sorteioId));
        const user = this.entitiesRepository.isOwner(userId,Number(sorteioId))
        if(!user){
            return { error : 'Você não tem permissão para ver os vencedores deste sorteio'}
        }
        if (!raffle) {
            return { error: 'Sorteio não encontrado' };
        }

        if (raffle.status !== 'finalizado') {
            return { error: 'Sorteio não Realizado' };
        }

        const items = await Item.findByCategory(categoriaId);
        const winners = [];

        if(!items || items.length === 0){
            return { error : 'Nenhum item encontrado para este sorteio'}
        }
        for (const item of items) {
            const winner = item.inscricoes.filter(select => select.estado_candidatura === 'ganho');
            winners.push(...winner);
        }

        const doc = new PDFDocument();
        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));

        doc.fontSize(16);
        doc.text('Resultado do Sorteio', {
            align: 'center'
        });
        doc.moveDown();

        doc.fontSize(12);
        doc.text(`Nome do Sorteio: ${raffle.nome}`, {
            align: 'left'
        });
        doc.text(`Data de Realização: ${raffle.data_realizacao.toLocaleDateString()}`, {
            align: 'left'
        });
        doc.moveDown();
        doc.fontSize(14);
        doc.text('Lista de Vencedores:', {
            align: 'left'
        });
        doc.moveDown();
        doc.fontSize(10);
        winners.forEach((winner, index) => {
            doc.text(`${index + 1}. Inscrição #${winner.id}`, {
                align: 'left'
            });
            doc.text(`   Nome: ${winner.usuario.nome_completo}`, {
                align: 'left'
            });
            doc.text(`   CPF: ${winner.usuario.numero_bilhete}`, {
                align: 'left'
            });
            doc.text(`   Item: ${winner.itemId}`, {
                align: 'left'
            });
            doc.moveDown();
        });
        doc.fontSize(8);
        doc.text(`Documento gerado em ${new Date().toLocaleString()}`, {
            align: 'center'
        });

        return new Promise((resolve, reject) => {
            doc.on('end', async () => {
                try {
                    const pdfBuffer = Buffer.concat(chunks);
                    const fileName = `winners-${sorteioId}-${uuidv4()}.pdf`;
                    const fileRef = ref(storagebucket, `pdfs/winners/${fileName}`);
                    
                    await uploadBytes(fileRef, pdfBuffer, {
                        contentType: 'application/pdf'
                    });
                    const downloadURL = await getDownloadURL(fileRef);
                    resolve({ pdfUrl: downloadURL });
                } catch (error) {
                    reject({ error: 'Erro ao fazer upload do PDF: ' + error });
                }
            });
            doc.end();
        });

    } catch (error) {
        return { error: 'Algo deu errado: ' + error };
    }
}
 participate = async (sorteioId : number,ItemId:number,userId: number) : Promise<IInscricoes[] | { error : string}> => {
    try {
     const user = await this.entitiesRepository.isParticipant(userId)
     const raffleFinished = await this.entitiesRepository.alradyDone(sorteioId)
     if(!user){
        return { error : 'Você não tem permissão para participar deste sorteio'}
     }
     if(raffleFinished){
        return { error : 'Ops! Já não é possível lhe inscrever neste sorteio'}
     }
     const participant = await this.entitiesRepository.isParticipantInRaffle(userId,sorteioId)
     if(participant){
        return { error : 'Você Já está participando deste sorteio'}
     } 
     const own = await this.entitiesRepository.isOwner(userId,sorteioId)
     if(own){
        return { error : 'Você não pode participar de seu próprio sorteio'}
     }
     const inscricao = new Inscricao({itemId : ItemId,usuarioId : userId,estado_candidatura : 'pendente'})
     await inscricao.save()
     return await Inscricao.findByUserId(userId) as IInscricoes[]
    } catch (error) {
       return { error : 'Algo deu errado : ' + error}
    }
}
 cancelParticipation = async (inscricaoId:number,userId:number) : Promise<IInscricoes[] | { error : string}> => {
    try {
        const inscricao = await Inscricao.findById(inscricaoId)
        if(!inscricao){
            return { error : 'Inscrição não encontrada'}
        }
        const user = await this.entitiesRepository.isParticipant(userId)
        if(!user){
            return { error : 'Você não tem permissão para cancelar esta inscrição'}
        }
        if(inscricao.usuarioId !== userId){
            return { error : 'Você não tem permissão para cancelar esta inscrição'}
        }
        await Inscricao.delete(inscricaoId)
        return await Inscricao.findByUserId(userId) as IInscricoes[]
    } catch (error) {
        return { error : 'Algo deu errado : ' + error}
    }
}   

async updateCandidateStatus(inscricaoId:number,status:EstadoCandidatura) : Promise<IInscricoes[] | { error : string}>{
    try {
        const inscricao = await Inscricao.findById(inscricaoId)
        if(!inscricao){
            return { error : 'Inscrição não encontrada'}
        }
        const item = await Item.findById(inscricao.itemId);
        const category = await Categoria.findById(parseInt(String(item?.categoriaId)))
        const sorteio = await Sorteio.findById(parseInt(String(category?.sorteioId)))
      
        const notifyData = {
            title : `Alteração de Candidatura ${sorteio?.nome}`,
            message : `Sua candidatura para ${item?.nome} de ${category?.nome} foi alterada para ${status}`,
            usuarioId : inscricao.usuarioId,
            status : EstadoNotificacao.pendente

        }

        await Inscricao.update(inscricaoId, {estado_candidatura : status })
        const notificar = new Notificacao(notifyData)
        await notificar.save()
        return await Inscricao.findByCategory(parseInt(String(category?.id))) as IInscricoes[]
    } catch (error) {
        return { error : 'Algo deu errado : ' + error}
    }
}

async searchRaffle(string : string) : Promise<ISorteio[] | { error : string}> {
    try {
        const raffles = await Sorteio.findAll();
        const search = raffles.filter(item => item.nome.includes(string))
        if(!search){
            return { error : 'Nenhum sorteio encontrado'}
        }
        return search as ISorteio[]
    } catch (error) {
        return { error : 'Algo deu errado : ' + error }
   }
}

}

export default RefflesService;