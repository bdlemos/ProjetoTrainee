import UserService from "./src/domains/User/service/UserService";

async function main(){
    try{
        const user = await UserService.create({
            email: "oi@gmail.com",
            password: "123456",
            name: "joao",
            role: "ADMIN",
        });
        console.log(user);
    }catch(err){
        console.log(err);
    }
}

main();