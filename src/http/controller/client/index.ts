import { authService, rafflesService, userService } from "../../service/client"
import AuthController from "./AuthController"
import RafflesController from "./RafflesController"
import UserController from "./UserController"

const authController = new AuthController(authService)
const userController = new UserController(userService)
const rafflesController = new RafflesController(rafflesService)
export { authController, userController,rafflesController }