import { User } from "@prisma/client";
import UserService from "../service/UserService";

export async function addUser(data: User){
    try{
        await UserService.create(data); 
        console.log("Sucesso!");
    } catch(error){
    console.log("Erro ao adicionar usuário."); //fazer visualização do erro depois
    }
}