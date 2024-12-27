import { Request, Response } from "express";
import { IAproveEntities } from "../../interface/admin/aproveEntities.interface";
import { StatusPedido } from "@prisma/client";

class AproveEntitiesController {
    constructor(private aprovaEntitiesService: IAproveEntities) {}

    showChengeStatusOrders = async (req: Request, res: Response) => {
        const { status } = req.params;

        if (!Object.values(StatusPedido).includes(status as StatusPedido)) {
            return res.status(404).json({ message: "Status inválido" });
        }

        const result = await this.aprovaEntitiesService.showAllOrderByStatus(status as StatusPedido);
        
        if ('error' in result) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({
            message: `Dados da Busca de Pedidos com status: ${status}`,
            data: result
        });
    };

    AproveStatusOrders = async (req: Request, res: Response) => {
        const {idOrder } = req.params;

        const result = await this.aprovaEntitiesService.changeUserStatus('sorteador', parseInt(idOrder));
        
        if ('error' in result) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({
            message: `Estado alterado com sucesso para Aprovado`,
            data: result
        });
    };

    RejectStatusOrders = async (req: Request, res: Response) => {
        const { id, idOrder } = req.params;

        const result = await this.aprovaEntitiesService.changeUserStatusReject(parseInt(id), parseInt(idOrder));
        
        if ('error' in result) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({
            message: `Estado alterado com sucesso para Rejeitado`,
            data: result
        });
    };
}

export default AproveEntitiesController;
