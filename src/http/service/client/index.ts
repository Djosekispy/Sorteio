import AuthService from "./AuthService";
import UserService from "./UserService";
import RafflesService from "./RafflesService";
import { entitiesRepository } from "../../repository";
import { CategoryService } from "./CategoryService";
const authService = new AuthService()
const userService = new UserService();
const rafflesService = new RafflesService(entitiesRepository);
const categoryService = new CategoryService(entitiesRepository)
export { authService, userService,rafflesService,categoryService }