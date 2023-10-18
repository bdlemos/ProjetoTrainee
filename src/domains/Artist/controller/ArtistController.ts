import { Artist } from '@prisma/client';
import ArtistService from '../service/ArtistService';

export async function addArtist(data: Artist){
	try{
		await ArtistService.create(data); 
		console.log('Artista adicionado com sucesso!');
	} catch(error){
		console.log('Erro ao adicionar artista.');
	}
}

export async function getArtistByID(idInput: number){
	try{
		const artist = await ArtistService.getByID(idInput); 
		console.log('O artista é: ', artist);
	} catch(error){ 
		console.log('Erro ao buscar artista.');
	}
}

export async function getAllArtists(){
	try{
		const Artists = await ArtistService.getAll(); 
		console.log(Artists);
	} catch(error){ 
		console.log('Erro ao imprimir artistas.');
	}
}

export async function updateArtist(data: Artist){
	try{
		await ArtistService.update(data); 
		console.log('Artista atualizado com sucesso!');
	} catch(error){ 
		console.log('Erro ao atualizar artista:', error);
	}
}

export async function removeArtist(id: number){
	try{
		await ArtistService.delete(id); 
		console.log('Artista removido com sucesso!');
	} catch(error){ 
		console.log('Erro ao remover artista.');
	}
}