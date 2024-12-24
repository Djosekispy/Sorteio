

interface IEntitiesRepository{
    isOrganizer(userId: number): Promise<boolean>
    isOwner(userId: number, raffleId: number): Promise<boolean>
    alradyDone(raffleId: number): Promise<boolean>
    isParticipant(userId: number): Promise<boolean>
    isParticipantInRaffle(userId: number, raffleId: number): Promise<boolean>
}

export default IEntitiesRepository