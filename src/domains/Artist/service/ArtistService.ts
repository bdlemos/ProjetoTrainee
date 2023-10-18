import prisma from '../../../../config/client';
import { Artist } from '@prisma/client';

class ArtistService{
	async create(body: Artist){
		const artist = await prisma.artist.create({
			data: {
				name: body.name,
				streams: body.streams,
				photo: body.photo,
			}
		});

		return artist;
	}

	async update(body: Artist){	
		const artist = await prisma.artist.update({
			data: {
				name: body.name,
				streams: body.streams,
				photo: body.photo,
			},
			where: {
				id: body.id, 
			},
		});

		return artist;
	}

	async getByID(idInput: number){
		const artist = await prisma.artist.findUnique({
			where: {
				id: idInput,
			}
		});
		return artist;
	}

	//READ
	async getAll(){ 
		const artists = await prisma.artist.findMany();
        
		return artists;
	}

	async delete(idInput: number){
		const artist = await prisma.artist.delete({
			where: {
				id: idInput,                
			}
		})

		return artist;
	}
}

export default new ArtistService;