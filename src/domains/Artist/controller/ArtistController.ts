import { Artist } from '@prisma/client';
import ArtistService from '../service/ArtistService';
import { Router, Request, Response, NextFunction } from 'express';
import { checkRole } from '../../../middlewares/checkRole';
import statusCodes from '../../../../utils/constants/statusCode';

const router = Router();

//ROTAS
router.get('/', async(req:Request, res:Response, next:NextFunction) => {
	try{
		const Artists = await ArtistService.getAll(); 
		res.status(statusCodes.SUCCESS).json(Artists);
	} catch(error){ 
		res.status(statusCodes.NOT_FOUND);
		next(error);
	}
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const artist = await ArtistService.getByID(parseInt(req.params.id)); 
		res.status(statusCodes.SUCCESS).json(artist);
	} catch (error) { 
		res.status(statusCodes.NOT_FOUND);
		next(error);
	}
})

router.post('/create',
	checkRole("admin"),
	async (req: Request, res: Response, next: NextFunction) => {
	try{
		const createData = {
			id: +req.params.id,
			name: req.body.name,
			streams: +req.body.streams,
			photo: req.body.photo
		} as Artist;
		await ArtistService.create(createData); 
		res.status(statusCodes.CREATED).json('Artista adicionado com sucesso!');
	} catch(error){
		next(error);
	}
})




router.put('/update/:id',
	checkRole("admin"),
	async (req: Request, res: Response, next: NextFunction) => {
	try{
		const updateData = {
			id: +req.params.id,
			name: req.body.name,
			streams: +req.body.streams,
			photo: req.body.photo
		} as Artist;
		await ArtistService.update(updateData); 
		res.status(statusCodes.SUCCESS).json('Artista atualizado com sucesso!');
	} catch(error){ 
		next(error);
	}
})

router.delete('/remove/:id',
	//checkRole("admin"), 
	async (req: Request, res: Response, next: NextFunction) =>{
	try{
		await ArtistService.delete(+req.params.id); 
		res.status(statusCodes.SUCCESS).json('Artista removido com sucesso!');
	} catch(error){ 
		next(error);
	}
})

export default router;