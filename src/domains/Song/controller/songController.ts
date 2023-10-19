import { Song } from '@prisma/client';
import SongService from '../service/SongService';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

//ROTAS
router.get('/', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const songs = await SongService.getAll();
		res.json(songs);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const song = await SongService.getByID(+req.params.id);
		res.json(song);
	} catch (error) {
		next(error);
	}
});

router.get('/artist/:artistId', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const songs = await SongService.getByArtist(+req.params.artistId);
		res.json(songs);
	} catch (error) {
		next(error);
	}
});

router.post('/create', async(req:Request, res:Response, next:NextFunction) => {
	try {
		await SongService.create(req.body);
		res.json('Música adicionada com sucesso!');
	} catch (error) {
		next(error);
	}
});

router.put('/update', async(req:Request, res:Response, next:NextFunction) => {
	try {
		await SongService.update(req.body);
		res.json('Música atualizada com sucesso!');
	} catch (error) {
		next(error);
	}
});

router.delete('/remove', async(req:Request, res:Response, next:NextFunction) => {
	try {
		await SongService.remove(req.body);
		res.json('Música removida com sucesso!');
	} catch (error) {
		next(error);
	}
});

//FUNÇÕES
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
		await SongService.remove(id); 
		console.log('Música removida com sucesso!');
	} catch(error){ 
		console.log('Erro ao remover música.');
	}
}

export default router;