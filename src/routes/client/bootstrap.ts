import AuthController from "../../http/controller/AuthController"
import UserController from "../../http/controller/UserController"
import { authService, userService } from "../../http/service"

const authController = new AuthController(authService)
const userController = new UserController(userService)
export { authController, userController }