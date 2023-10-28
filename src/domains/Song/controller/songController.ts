import statusCodes from '../../../../utils/constants/statusCode';
import SongService from '../service/SongService';
import { Router, Request, Response, NextFunction } from 'express';
import { checkRole } from '../../../middlewares/checkRole';

const router = Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const songs = await SongService.getAll();
		res.status(statusCodes.SUCCESS).json(songs);
	} catch (error) {
		res.status(statusCodes.NOT_FOUND);
		next(error);
	}
})

router.get('/:id', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const song = await SongService.getByID(+req.params.id);
		res.status(statusCodes.SUCCESS).json(song);
	} catch (error) {
		res.status(statusCodes.NOT_FOUND);
		next(error);
	}
})

router.get('/artist/:artistId', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const songs = await SongService.getByArtist(+req.params.artistId);
		res.status(statusCodes.SUCCESS).json(songs);
	} catch (error) {
		res.status(statusCodes.NOT_FOUND);
		next(error);
	}
})

router.post('/create', 
	checkRole('admin'), 
	async(req:Request, res:Response, next:NextFunction) => {
	try {
		await SongService.create(req.body);
		res.status(statusCodes.CREATED).json('Música adicionada com sucesso!');
	} catch (error) {
		next(error);
	}
});

router.put('/update/:id', 
	checkRole('admin'), 
	async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = +req.params.id;
		const updateData = req.body;
		const song = await SongService.update(id, updateData);
		res.status(statusCodes.SUCCESS).json('Música atualizada com sucesso!');
	} catch (error) {
		next(error);
	}
});

router.delete('/remove/:id',
 	checkRole('admin'),
	async(req:Request, res:Response, next:NextFunction) => {
	try {
		await SongService.remove(+req.params.id);
		res.status(statusCodes.SUCCESS).json('Música removida com sucesso!');
	} catch (error) {
		next(error);
	}
})

export default router;