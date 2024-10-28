import { authService, userService } from "../../service/client"
import AuthController from "./AuthController"
import UserController from "./UserController"

const authController = new AuthController(authService)
const userController = new UserController(userService)
export { authController, userController }