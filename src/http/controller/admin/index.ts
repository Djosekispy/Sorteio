import { aprovaEntitiesService, authAdminService } from "../../service/admin";
import AproveEntitiesController from "./AproveEntitiesController";
import AuthAdminController from "./AuthAdminController";


const aproveEntitiesController = new AproveEntitiesController(aprovaEntitiesService);
const authAdminController = new AuthAdminController(authAdminService)
export {
    aproveEntitiesController,
    authAdminController
}