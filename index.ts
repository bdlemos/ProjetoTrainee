import UserService from "./src/domains/User/service/UserService";
import { User } from "@prisma/client";

async function main(){
    try{
        const user = await UserService.create({
            email: "teste@gmail.com",
            password: "123456",
            name: "teste",
            role: "ADMIN",
        } as User);
        console.log(user);
    }catch(err){
        console.log(err);
    }
}

main();