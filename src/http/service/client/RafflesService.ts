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

class RefflesService implements IRafflesInterface {
 async save(data : ISorteio) : Promise<ISorteio[]  | { error : string}>
 {
    try {
        const raffle = new Sorteio(data)
       await  raffle.save();
       return await Sorteio.findByUserId(data.organizadorId) as ISorteio[]; 
    } catch (error) {
        return { error : 'Algo deu errado : ' + error}
    }
 }
 async update (sorteioId : number, data : Partial<ISorteio>) : Promise<ISorteio | { error : string} >
 {
    try {
        const findRaffle = await Sorteio.findById(sorteioId)
        if(!findRaffle){
            return { error : 'Sorteio Inexistente'}
        }
        await Sorteio.update(sorteioId,data)
        return await Sorteio.findById(sorteioId) as ISorteio
    } catch (error) {
        return { error : 'Algo deu errado : ' + error }
    }
 }

 async showAllAvaliable() : Promise<ISorteio[] | { error : string}>
 {
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
 async showOneById(sorteioId:number) : Promise<any | { error : string} >
 {
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

async showAllByUserId(userId:number) : Promise<ISorteio[] | { error : string} >
{
    try {
        const raffles = await Sorteio.findByUserId(userId);
        if(!raffles || raffles.length === 0) {
            return { error: 'Nenhum sorteio encontrado para este usuário' };
        }
        return raffles;
    } catch (error) {
        return { error: 'Algo deu errado: ' + error };
    }
}

async delete(sorteioId:number) : Promise<ISorteio[] | { error : string}>
{
    try {
        const raffle = await Sorteio.findById(sorteioId);
        if(!raffle) {
            return { error: 'Sorteio não encontrado' };
        }
        await Sorteio.delete(sorteioId);
        return await Sorteio.findAll();
    } catch (error) {
        return { error: 'Algo deu errado: ' + error };
    }
}


async draw(sorteioId: number,categoriaId:number): Promise<IInscricoes[] | { error: string }> {
    try {
        const raffle = await Sorteio.findById(sorteioId);
        if (!raffle) {
            return { error: 'Sorteio não encontrado' };
        }
        if (raffle.status !== 'corrente') {
            return { error: 'Este sorteio não está mais disponível' };
        }
        const items = await Item.findByCategory(categoriaId);
        const winners = [];
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


async winners(sorteioId: string, categoriaId: number): Promise<{ pdfUrl: string } | { error: string }> {
    try {
        const raffle = await Sorteio.findById(Number(sorteioId));
        if (!raffle) {
            return { error: 'Sorteio não encontrado' };
        }

        const items = await Item.findByCategory(categoriaId);
        const winners = [];
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

}


export default RefflesService;