import prisma from "../../../../client/client";
import { Song } from "@prisma/client";

class SongService{
    async create(body: Song){
        const song = await prisma.song.create({
            data: {
                name: body.name,
                genre: body.genre,
                album: body.album,
                artistId: body.artistId,
            }
        });

        return song;
    }

    async update(body: Song){	
        const song = await prisma.song.update({
            data: {
                name: body.name, 
                genre: body.genre, 
                album: body.album,
                artistId: body.artistId,
            },
            where: {
                id: body.id, 
            },
        });

        return song;
    }

    //read
    async getAll(){ //devolve todas as músicas do banco
        const songs = await prisma.song.findMany();
        
        return songs;
    }

    async delete(idInput: number){
        const song = await prisma.song.delete({
            where: {
                id: idInput,                
            }
        })

        return song;
    }
}

export default new SongService;