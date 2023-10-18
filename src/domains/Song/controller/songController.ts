import { Song } from '@prisma/client';
import SongService from '../service/SongService';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

export async function addSong(data: Song){
	try{
		await SongService.create(data); 
		console.log('Música adicionada com sucesso!');
	} catch(error){ 
		console.log('Erro ao adicionar música.');
	}
}

export async function getAllSongs(){
	try{
		await SongService.getAll(); 
	} catch(error){ 
		console.log('Erro ao bucar músicas.');
	}
}

export async function getSongByID(songId: number){
	try{
		const song = await SongService.getByID(songId); 
	} catch(error){ 
		console.log('Erro ao buscar música.');
	}
}

export async function getSongsByArtist(artistId: number){
	try{
		const songs = await SongService.getByArtist(artistId); 
	} catch(error){ 
		console.log('Erro ao buscar músicas.');
	}
}

export async function updateSong(data: Song){
	try{
		await SongService.update(data); 
		console.log('Música atualizada com sucesso!');
	} catch(error){ 
		console.log('Erro ao atualizar música:', error);
	}
}

export async function removeSong(id: number){
	try{
		await SongService.delete(id); 
		console.log('Música removida com sucesso!');
	} catch(error){ 
		console.log('Erro ao remover música.');
	}
}