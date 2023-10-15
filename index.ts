import { User, Song, Artist } from "@prisma/client";
import { addUser, getAllUser, deleteUser, updateUser, getByUserEmail } from "./src/domains/User/controller/UserController";
import { addSong, getAllSongs, printAllSongs, removeSong, updateSong, printSongsByArtist, printSongByID } from "./src/domains/Song/controller/songController";
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

const teste_usuario = async () => {
    //TESTE DAS FUNÇÕES DE USUÁRIO
    await addUser({
        email: "teste@gmail.com",
        password: "123456",
        name: "teste",
        role: "ADMIN",
    } as User);
    await getByUserEmail("teste@gmail.com");
    await updateUser({
        id: 2,
        email: "update@hotmail.com",
        password: "123456",
        name: "update",
    }as User);
    await deleteUser(1);
    await getAllUser();
}

async function main() {

    //TESTE ARTISTA
    await teste_artista();


    //TESTE DAS FUNÇÕES DE MÚSICA
    const song1 = await addSong({
        name: "Fragments of Time",
        genre: "Eletônica",
        album: "Randon Acess Memories",
        artistId: 1,
    } as Song);

    const song2 = await addSong({
        name: "Por Enquanto",
        genre: "MPB",
        album: "Cássia Eller",
        artistId: 2,
    } as Song);

    const song3 = await addSong({
        name: "Baby",
        genre: "Pop",
        album: "Believe",
        artistId: 3,
    } as Song);

    const teste = await updateSong({
        id: 7,
        name: "Aerodynamic",
        album: "Discovery"
    } as Song);

    const teste2 = await printSongsByArtist(1);

    await printAllSongs();
}

//teste_usuario()
main();