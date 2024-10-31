

interface IEntitiesRepository{
    isOrganizer(userId: number): Promise<boolean>
    isOwner(userId: number, raffleId: number): Promise<boolean>
}

export default IEntitiesRepository