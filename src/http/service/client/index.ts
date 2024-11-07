import AuthService from "./AuthService";
import UserService from "./UserService";
import RafflesService from "./RafflesService";
import { entitiesRepository } from "../../repository";
import { CategoryService } from "./CategoryService";
import { ItemService } from "./ItemService";
import ComplaintService from "./ComplaintService";
const authService = new AuthService()
const userService = new UserService();
const rafflesService = new RafflesService(entitiesRepository);
const categoryService = new CategoryService(entitiesRepository)
const itemService = new ItemService(entitiesRepository)
const complaintService = new ComplaintService(entitiesRepository)

export { authService, userService,rafflesService,categoryService,itemService,complaintService }