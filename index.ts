import { User, Song } from "@prisma/client";
import { addUser } from "./src/domains/User/controller/UserController";
import { addSong, getAllSongs, removeSong, updateSong } from "./src/domains/Song/controller/songController";

async function main(){
    
    //TESTE DAS FUNÇÕES DE USUÁRIO
    await addUser({
        email: "teste@gmail.com",
        password: "123456",
        name: "teste",
        role: "ADMIN",
    } as User);

    //TESTE DAS FUNÇÕES DE MÚSICA
    /*
    await addSong({
        name: 'Fragments of Time',
        genre: 'Eletônica',
        album: 'Randon Acess Memories',
        artistId: 1,
    } as Song);

    await addSong({
        name: 'Por Enquanto',
        genre: 'MPB',
        album: 'Cássia Eller',
        artistId: 2,
    } as Song);
    
    await updateSong({ //erro
        id: 1,
        name: 'Fragments of Time',
    } as Song);
    */

}

main();