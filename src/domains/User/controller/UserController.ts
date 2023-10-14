import { User } from "@prisma/client";
import UserService from "../service/UserService";

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

export async function listUsers() {
  try {
    const users = await UserService.list();
    console.log("Lista de usuários:", users);
  } catch (error) {
    console.log("Erro ao listar usuários:", error);
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
