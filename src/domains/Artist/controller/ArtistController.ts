import { Artist } from '@prisma/client';
import ArtistService from '../service/ArtistService';
import { Router, Request, Response, NextFunction } from 'express';
import { create } from 'domain';

const router = Router();

//ROTAS
router.get('/', async(req:Request, res:Response, next:NextFunction) => {
	try{
		const Artists = await ArtistService.getAll(); 
		res.json(Artists);
	} catch(error){ 
		next(error);
	}
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const artist = await ArtistService.getByID(parseInt(req.params.id)); 
		res.json(artist);
	} catch (error) { 
		next(error);
	}
})

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const createData = {
			id: +req.params.id,
			name: req.body.name,
			streams: +req.body.streams,
			photo: req.body.photo
		} as Artist;
		await ArtistService.create(createData); 
		res.json('Artista adicionado com sucesso!');
	} catch(error){
		next(error);
	}
})




router.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const updateData = {
			id: +req.params.id,
			name: req.body.name,
			streams: +req.body.streams,
			photo: req.body.photo
		} as Artist;
		await ArtistService.update(updateData); 
		res.json('Artista atualizado com sucesso!');
	} catch(error){ 
		next(error);
	}
})

router.delete('/remove/:id', async (req: Request, res: Response, next: NextFunction) =>{
	try{
		await ArtistService.delete(+req.params.id); 
		res.json('Artista removido com sucesso!');
	} catch(error){ 
		next(error);
	}
})

export default router;