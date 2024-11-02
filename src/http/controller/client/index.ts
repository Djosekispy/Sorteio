import { authService, categoryService, complaintService, itemService, rafflesService, userService } from "../../service/client"
import AuthController from "./AuthController"
import { CategoryController } from "./CategoryController"
import ComplaintController from "./ComplaintController"
import ItemController from "./ItemController"
import RafflesController from "./RafflesController"
import UserController from "./UserController"

const authController = new AuthController(authService)
const userController = new UserController(userService)
const rafflesController = new RafflesController(rafflesService)
const categoryController = new CategoryController(categoryService)
const itemController = new ItemController(itemService)
const complaintController = new ComplaintController(complaintService)
export { authController, userController,rafflesController,categoryController,itemController,complaintController }