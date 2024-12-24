import { IUsuario } from "../../database/entities/IUsuario"
import Item from "../../database/model/itens"
import Sorteio from "../../database/model/sorteio"
import Usuario from "../../database/model/usuario"
import IEntitiesRepository from "../repositoryInterfaces/IEntitiesRepository"


class EntitiesRepository implements IEntitiesRepository{

    async isOrganizer(userId: number){
        const user = await Usuario.findById(userId)
         return user?.tipo_perfil === 'sorteador'
    }
  async isOwner(userId: number, raffleId: number){
    const raffle = await Sorteio.findById(raffleId)
    return raffle?.organizadorId === userId
   }
   async isParticipant(userId: number){
    const user = await Usuario.findById(userId)
    return user?.tipo_perfil === 'cliente'
   }
   async  alradyDone(raffleId: number): Promise<boolean> {
    const raffle = await Sorteio.findById(raffleId)
    let done = false
    if(raffle?.status === 'cancelado') done = true;
    if(raffle?.status === 'finalizado') done = true;
    return done
   }
   async isParticipantInRaffle(userId: number, raffleId: number){
    const raffle = await Sorteio.findById(raffleId)
    const categoryIds =  raffle?.categorias.map(categoria => categoria.id)
    let subscribers : IUsuario[] = [] 
    categoryIds?.forEach(async id => {    
        const candidates = await Item.findByCategory(id) 
        candidates.forEach(candidate => {
            candidate.inscricoes.forEach(inscricao => {
                subscribers.push(inscricao.usuario as IUsuario)
            })
        })
    })
   return subscribers.some(subscriber => subscriber.id === userId)
   }
}

export default EntitiesRepository;