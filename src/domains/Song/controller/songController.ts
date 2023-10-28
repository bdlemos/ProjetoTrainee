import SongService from '../service/SongService';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const songs = await SongService.getAll();
		res.json(songs);
	} catch (error) {
		next(error);
	}
})

router.get('/:id', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const song = await SongService.getByID(+req.params.id);
		res.json(song);
	} catch (error) {
		next(error);
	}
})

router.get('/artist/:artistId', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const songs = await SongService.getByArtist(+req.params.artistId);
		res.json(songs);
	} catch (error) {
		next(error);
	}
})

router.post('/create', async(req:Request, res:Response, next:NextFunction) => {
	try {
		await SongService.create(req.body);
		res.json('Música adicionada com sucesso!');
	} catch (error) {
		next(error);
	}
});

router.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = +req.params.id;
		const updateData = req.body;
		const song = await SongService.update(id, updateData);
		res.json('Música atualizada com sucesso!');
	} catch (error) {
		next(error);
	}
});

router.delete('/remove/:id', async(req:Request, res:Response, next:NextFunction) => {
	try {
		await SongService.remove(+req.params.id);
		res.json('Música removida com sucesso!');
	} catch (error) {
		next(error);
	}
})

export default router;