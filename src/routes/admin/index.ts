import { Router } from "express";
import { aproveEntitiesController } from "../../http/controller/admin";
import { authenticateTokenAdmin } from "../../http/middleware/adminToken";
import { userController } from "../../http/controller/client";


const adminRouter = Router()


adminRouter.get("/admin/entity-requests/:status", authenticateTokenAdmin, aproveEntitiesController.showChengeStatusOrders);
adminRouter.post("/admin/entity-requests/:id/:idOrder/approve",authenticateTokenAdmin, aproveEntitiesController.AproveStatusOrders);
adminRouter.post("/admin/entity-requests/:id/:idOrder/reject",authenticateTokenAdmin, aproveEntitiesController.RejectStatusOrders);
adminRouter.get('/users/:id',authenticateTokenAdmin, userController.showOneUser);



export default adminRouter;