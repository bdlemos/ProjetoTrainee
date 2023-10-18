import { User } from "@prisma/client";
import UserService from "../service/UserService";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
  try {
      const users = await UserService.getAll();
      res.json(users);
  } catch (error) {
      next(error);
    }
})

router.get('/:email', async(req:Request, res:Response, next:NextFunction) => {
  try {
      const users = await UserService.getByEmail(req.params.email);
      res.json(users);
  } catch (error) {
      next(error);
    }
})

router.post('/create', async(req:Request, res:Response, next:NextFunction) => {
  try {
      await UserService.create(req.body);
      res.json('Usuário criado com sucesso!');
  } catch (error) {
      next(error);
    }
})

export async function getAllUser() {
  try {
    const users = await UserService.getAll();
    console.log("Lista de usuários:", users);
  } catch (error) {
    console.log("Erro ao listar usuários:", error);
  }
}


export async function addUser(data: User) {
  try {
    await UserService.create(data);
    console.log("Sucesso ao adicionar usuário!");
  } catch (error) {
    console.log("Erro ao adicionar usuário:", error);
  }
}

export async function updateUser(data: User) {
  try {
    await UserService.update(data);
    console.log("Sucesso ao atualizar usuário!");
  } catch (error) {
    console.log("Erro ao atualizar usuário:", error);
  }
}


export async function getByUserEmail(email: string) {
  try {
    const user = await UserService.getByEmail(email);
    if (user) {
      console.log("Usuário encontrado:", user);
    } else {
      console.log("Nenhum usuário encontrado com o e-mail fornecido.");
    }
  } catch (error) {
    console.log("Erro ao buscar usuário por e-mail:", error);
  }
}

export async function deleteUser(userId: number) {
  try {
    await UserService.delete(userId);
    console.log("Usuário excluído com sucesso!");
  } catch (error) {
    console.log("Erro ao excluir usuário:", error);
  }
}
