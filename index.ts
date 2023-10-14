import { User, Song } from "@prisma/client";
import { addUser } from "./src/domains/User/controller/UserController";
import { addSong, getAllSongs, printAllSongs, removeSong, updateSong } from "./src/domains/Song/controller/songController";

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

    const teste = await updateSong({ //erro
        id: 1,
        name: 'Giorgio by Moroder',
    } as Song);


    await printAllSongs();
}

main();