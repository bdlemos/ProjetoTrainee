import { User, Song,Artist } from "@prisma/client";
import { addUser } from "./src/domains/User/controller/UserController";
import { addSong, getAllSongs, removeSong, updateSong } from "./src/domains/Song/controller/songController";
import { addArtist, getAllArtists, removeArtist, updateArtist } from "./src/domains/Artist/controller/ArtistController";


const teste_artista = async () => {
/*     await addArtist({
        name: "Taylor Swift",
        streams: 100,
        photo: "teste",
    } as Artist); */
    await removeArtist(8);
    await updateArtist({
        id: 9,
        name: "Taylor Swift",
        streams: 1000,
        photo: "teste",
    } as Artist);
     await getAllArtists();
}

async function main(){
    
    //TESTE DAS FUNÇÕES DE USUÁRIO
    await addUser({
        email: "teste@gmail.com",
        password: "123456",
        name: "teste",
        role: "ADMIN",
    } as User);

    //TESTE DAS FUNÇÕES DE MÚSICA
    const song1 = await addSong({
        name: 'Fragments of Time',
        genre: 'Eletônica',
        album: 'Randon Acess Memories',
        artistId: 1,
    } as Song);

    const song2 = await addSong({
        name: 'Por Enquanto',
        genre: 'MPB',
        album: 'Cássia Eller',
        artistId: 2,
    } as Song);

    const song3 = await addSong({
        name: 'Baby',
        genre: 'Pop',
        album: 'Believe',
        artistId: 3,
    } as Song);   
    /*
    const teste = await updateSong({ //erro
        id: 1,
        name: 'Fragments of Time',
    } as Song);
    */

    await getAllSongs();
}

teste_artista();