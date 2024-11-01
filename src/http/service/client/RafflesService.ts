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
        return rafflesAvaliable
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
        return raffles;
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
        return await Sorteio.findAll();
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

        // Criar o PDF em memória
        const doc = new PDFDocument();
        const chunks: Buffer[] = [];

        // Coletar chunks do PDF
        doc.on('data', (chunk) => chunks.push(chunk));

        // Cabeçalho
        doc.fontSize(16);
        doc.text('Resultado do Sorteio', {
            align: 'center'
        });
        doc.moveDown();

        // Informações do sorteio
        doc.fontSize(12);
        doc.text(`Nome do Sorteio: ${raffle.nome}`, {
            align: 'left'
        });
        doc.text(`Data de Realização: ${raffle.data_realizacao.toLocaleDateString()}`, {
            align: 'left'
        });
        doc.moveDown();

        // Lista de vencedores
        doc.fontSize(14);
        doc.text('Lista de Vencedores:', {
            align: 'left'
        });
        doc.moveDown();

        // Detalhes dos vencedores
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

        // Rodapé
        doc.fontSize(8);
        doc.text(`Documento gerado em ${new Date().toLocaleString()}`, {
            align: 'center'
        });

        // Finalizar o PDF e fazer upload para o Firebase
        return new Promise((resolve, reject) => {
            doc.on('end', async () => {
                try {
                    const pdfBuffer = Buffer.concat(chunks);
                    const fileName = `winners-${sorteioId}-${uuidv4()}.pdf`;
                    const fileRef = ref(storagebucket, `pdfs/winners/${fileName}`);
                    
                    // Upload do buffer para o Firebase
                    await uploadBytes(fileRef, pdfBuffer, {
                        contentType: 'application/pdf'
                    });

                    // Obter a URL de download
                    const downloadURL = await getDownloadURL(fileRef);
                    resolve({ pdfUrl: downloadURL });
                } catch (error) {
                    reject({ error: 'Erro ao fazer upload do PDF: ' + error });
                }
            });

            // Finalizar o documento
            doc.end();
        });

    } catch (error) {
        return { error: 'Algo deu errado: ' + error };
    }
}
 participate = async (sorteioId : number,ItemId:number,userId: number) : Promise<IInscricoes[] | { error : string}> => {
    try {
     const user = await this.entitiesRepository.isParticipant(userId)
     if(!user){
        return { error : 'Você não tem permissão para participar deste sorteio'}
     }
     const participant = await this.entitiesRepository.isParticipantInRaffle(userId,sorteioId)
     if(!participant){
        return { error : 'Você não está participando deste sorteio'}
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

}


export default RefflesService;