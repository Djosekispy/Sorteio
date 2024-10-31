import AuthService from "./AuthService";
import UserService from "./UserService";
import RafflesService from "./RafflesService";
import { entitiesRepository } from "../../repository";
const authService = new AuthService()
const userService = new UserService();
const rafflesService = new RafflesService(entitiesRepository);
export { authService, userService,rafflesService }