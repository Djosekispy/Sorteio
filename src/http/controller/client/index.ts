import { authService, categoryService, rafflesService, userService } from "../../service/client"
import AuthController from "./AuthController"
import { CategoryController } from "./CategoryController"
import RafflesController from "./RafflesController"
import UserController from "./UserController"

const authController = new AuthController(authService)
const userController = new UserController(userService)
const rafflesController = new RafflesController(rafflesService)
const categoryController = new CategoryController(categoryService)
export { authController, userController,rafflesController,categoryController }