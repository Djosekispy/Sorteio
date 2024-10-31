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
}

export default EntitiesRepository;