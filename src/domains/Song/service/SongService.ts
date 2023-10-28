import prisma from '../../../../config/client';
import { Song } from '@prisma/client';
import { checkRole } from '../../../middlewares/checkRole';
import { PermissionError } from '../../../../errors/PermissionError';

class SongService{
	async create(body: Song){
		const song = await prisma.song.create({
			data: {
				name: body.name,
				genre: body.genre,
				album: body.album,
				artistId: +body.artistId,
			}
		});

		return song;
	}

	async update(id: number, body: Song){
		const song = await prisma.song.update({
			where: {
				id: id,
			},
			data: {
				name: body.name,
				genre: body.genre,
				album: body.album,
				artistId: body.artistId,
			},
		});
	
		return song;
	}

	//READ
	async getAll(){ 
		const songs = await prisma.song.findMany();
        
		return songs;
	}

	async getByArtist(idInput: number){
		const songs = await prisma.song.findMany({
			where: {
				artistId: idInput,
			}
		});
		return songs;
	}

	async getByID(idInput: number){
		const song = await prisma.song.findUnique({
			where: {
				id: idInput,
			}
		});
		return song;
	}

	async remove(idInput: number){
		const song = await prisma.song.delete({
			where: {
				id: idInput,                
			}
		})

		return song;
	}
}

export default new SongService;
