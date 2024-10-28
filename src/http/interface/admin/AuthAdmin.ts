import { IAdministrador } from "../../../database/entities/IAdministrador"


interface IAuthAdmin {
    registrar(dados : IAdministrador) : Promise<IAdministrador | { error : string } >
    entrar(email : string, senha : string):Promise<LoginReturnaAdmin | { error : string } >
     sair(userId : number) : Promise<void | { error : string } >
} 

interface LoginReturnaAdmin {
    user : IAdministrador,
    token : string
}


export {
    IAuthAdmin,
    LoginReturnaAdmin
}