import prisma from "../../../../client/client";
import { Song } from "@prisma/client";
import SongService from "../service/SongService";

export async function addSong(data: Song){
    try{
        await SongService.create(data); 
        console.log("Sucesso!");
    } catch(error){ //fazer controle de erros depois
    console.log("Erro: ", error);
    }
}

export async function getAllSongs(){
    try{
        const songs = await SongService.getAll(); 
        console.log(songs);
    } catch(error){ 
    console.log("Erro: ", error);
    }
}

export async function updateSong(data: Song){
    try{
        await SongService.update(data); 
        console.log("Sucesso!");
    } catch(error){ 
    console.log("Erro: ", error);
    }
}

export async function deleteSong(idInput: number){
    try{
        await SongService.delete(idInput); 
        console.log("Sucesso!");
    } catch(error){ 
    console.log("Erro: ", error);
    }
}
