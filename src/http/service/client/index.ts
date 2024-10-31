import AuthService from "./AuthService";
import UserService from "./UserService";
import RafflesService from "./RafflesService";
const authService = new AuthService()
const userService = new UserService();
const rafflesService = new RafflesService();
export { authService, userService,rafflesService }