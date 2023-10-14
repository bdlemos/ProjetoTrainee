import { Song } from "@prisma/client";
import SongService from "../service/SongService";

export async function addSong(data: Song){
    try{
        await SongService.create(data); 
        console.log("Sucesso!");
    } catch(error){ //fazer controle de erros depois
    console.log("Erro ao adicionar música.");
    }
}

export async function getAllSongs(){
    try{
        const songs = await SongService.getAll(); 
        console.log(songs);
    } catch(error){ 
    console.log("Erro ao imprimir músicas.");
    }
}

export async function updateSong(data: Song){
    try{
        await SongService.update(data); 
        console.log("Sucesso!");
    } catch(error){ 
    console.log("Erro ao atualizar música:", error);
    }
}

export async function removeSong(id: number){
    try{
        await SongService.delete(id); 
        console.log("Sucesso!");
    } catch(error){ 
    console.log("Erro ao remover música.");
    }
}