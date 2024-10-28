import { aprovaEntitiesService } from "../../service/admin";
import AproveEntitiesController from "./AproveEntitiesController";


const aproveEntitiesController = new AproveEntitiesController(aprovaEntitiesService);

export {
    aproveEntitiesController
}