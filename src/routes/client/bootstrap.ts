import AuthController from "../../http/controller/client/AuthController"
import UserController from "../../http/controller/client/UserController"
import { authService, userService } from "../../http/service/client"

const authController = new AuthController(authService)
const userController = new UserController(userService)
export { authController, userController }