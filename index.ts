import UserService from "./src/domains/User/service/UserService";
import { User, Song } from "@prisma/client";
import { addSong, getAllSongs } from "./src/domains/Song/controller/songController";

async function main(){
    try{
        const user = await UserService.create({
            email: "teste@gmail.com",
            password: "123456",
            name: "teste",
            role: "ADMIN",
        } as User);
        console.log(user);
    }catch(err){
        console.log(err);
    }

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

    await getAllSongs();
}

main();