import prisma from "../../../../config/client";
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

  async update(body: User) {
    const user = await prisma.user.update({
        data: {
        email: body.email,
        password: body.password,
        name: body.name,
        photo: body.photo,
        role: body.role,
      },
      where: {
        id: body.id,
      },
    });
    return user;
  }

  async getAll(){
    const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      photo: true,
      role: true,
    },
  });
  return users;
}

    async getByEmail(email: string){
      const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      photo: true,
      role: true
    },
  });
  return user;
}


  async delete(idInput: number) {
    const user = await prisma.user.delete({
      where: {
        id: idInput,
      },
    });
    return user;
  }
}

export default new UserService();
