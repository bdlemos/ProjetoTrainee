import prisma from "../../../../client/client";
import { User } from "@prisma/client";
class UserService{
    async create(body: User){
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name,
                photo: body.photo,
                role: body.role,

            }
        });
        return user;
    }
}

export default new UserService;