import { IUsuario } from "../../../database/entities/IUsuario"



interface IAuthUser {
    registrar(dados : IUsuario) : Promise<IUsuario | { error : string } >
    entrar(email : string, senha : string):Promise<LoginReturn | { error : string } >
    esqueceuSenha(email : string) : Promise<IUsuario | { error : string } >
    redefinirSenha(email : string, senha : string) : Promise<IUsuario | { error : string } >
    sair(userId : number) : Promise<void | { error : string } >
}

interface LoginReturn {
    user : IUsuario,
    token : string
}

export {IAuthUser, LoginReturn}