import AuthController from "../../http/controller/AuthController"
import { authService } from "../../http/service"

const authController = new AuthController(authService)

export { authController }