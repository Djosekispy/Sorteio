import { Router } from "express";
import { aproveEntitiesController, authAdminController } from "../../http/controller/admin";
import { authenticateTokenAdmin } from "../../http/middleware/adminToken";
import { userController } from "../../http/controller/client";
import { getUserIdFromToken } from "../../http/middleware/getIdFromToken";


const adminRouter = Router()


//  Rotas de Autenticação
adminRouter.post('/register', authAdminController.cadastrar); 
adminRouter.post('/login', authAdminController.login);          
adminRouter.get('/logout',getUserIdFromToken, authAdminController.logout); 

//Rotas de Administração (Aprovação de Entidades)
adminRouter.get("/entity-requests/:status", authenticateTokenAdmin, aproveEntitiesController.showChengeStatusOrders);
adminRouter.post("/entity-requests/:id/:idOrder/approve",authenticateTokenAdmin, aproveEntitiesController.AproveStatusOrders);
adminRouter.post("/entity-requests/:id/:idOrder/reject",authenticateTokenAdmin, aproveEntitiesController.RejectStatusOrders);
adminRouter.get('/users/:id',authenticateTokenAdmin, userController.showOneUser);



export default adminRouter;