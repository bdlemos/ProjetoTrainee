import { User } from '@prisma/client';
import UserService from '../service/UserService';
import { Router, Request, Response, NextFunction } from 'express';
import statusCodes from '../../../../utils/constants/statusCode';
import { checkRole } from '../../../middlewares/checkRole';
import { PermissionError } from '../../../../errors/PermissionError';
import { LoginError } from '../../../../errors/LoginError';
import { notLogged,loginMiddleware, verifyJWT, logoutMiddleware } from '../../../middlewares/authentication';

const router = Router();

//ROTAS
router.post('/login', notLogged, loginMiddleware);
router.post('/logout', logoutMiddleware);

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const users = await UserService.getAll();
		res.status(statusCodes.SUCCESS).json(users);
	} catch (error) {
		res.status(statusCodes.NOT_FOUND);
		next(error);
	}
});

router.get('/:email', async(req:Request, res:Response, next:NextFunction) => {
	try {
		const users = await UserService.getByEmail(req.params.email);
		res.status(statusCodes.SUCCESS).json(users);
	} catch (error) {
		res.status(statusCodes.NOT_FOUND);
		next(error);
	}
});

router.post('/create',
	async(req:Request, res:Response, next:NextFunction) => {
		try {
			const user = await UserService.getByEmail(req.body.email);
			if (user) {
				res.status(statusCodes.BAD_REQUEST).json('E-mail já cadastrado!');
				throw new PermissionError('E-mail já cadastrado!');
			}
			await UserService.create(req.body);
			res.status(statusCodes.CREATED).json('Usuário criado com sucesso!');

		} catch (error) {
			res.status(statusCodes.UNAUTHORIZED);
			next(error);
		}
	});

router.put('/update/:id',
	verifyJWT,
	checkRole('admin'),
	async(req:Request, res:Response, next:NextFunction) => {
		try {
			if (req.user.id !== +req.params.id) {
				throw new PermissionError('Você não tem permissão para atualizar outro usuário!');
			}
			const updateData = {
				email: req.body.email,
				id: +req.params.id,
				name: req.body.name,
				password: req.body.password,
				photo: req.body.photo,
				role: req.body.role
			} as User;
			await UserService.update(updateData);
			res.status(statusCodes.ACCEPTED).json('Usuário atualizado com sucesso!');
		} catch (error) {
			res.status(statusCodes.NOT_FOUND);
			next(error);
		}

	});

router.delete('/remove/:id', 
	checkRole('admin'),
	async(req:Request, res:Response, next:NextFunction) => {
		try {
			await UserService.delete(+req.params.id);
			res.status(statusCodes.ACCEPTED).json('Usuário excluído com sucesso!');
		} catch (error) {
			res.status(statusCodes.NOT_FOUND);
			next(error);
		}});

//FUNÇÕES

export async function getAllUser() {
	try {
		const users = await UserService.getAll();
		console.log('Lista de usuários:', users);
	} catch (error) {
		console.log('Erro ao listar usuários:', error);
	}
}


export async function addUser(data: User) {
	try {
		await UserService.create(data);
		console.log('Sucesso ao adicionar usuário!');
	} catch (error) {
		console.log('Erro ao adicionar usuário:', error);
	}
}

export async function updateUser(data: User) {
	try {
		await UserService.update(data);
		console.log('Sucesso ao atualizar usuário!');
	} catch (error) {
		console.log('Erro ao atualizar usuário:', error);
	}
}


export async function getByUserEmail(email: string) {
	try {
		const user = await UserService.getByEmail(email);
		if (user) {
			console.log('Usuário encontrado:', user);
		} else {
			console.log('Nenhum usuário encontrado com o e-mail fornecido.');
		}
	} catch (error) {
		console.log('Erro ao buscar usuário por e-mail:', error);
	}
}

export async function deleteUser(userId: number) {
	try {
		await UserService.delete(userId);
		console.log('Usuário excluído com sucesso!');
	} catch (error) {
		console.log('Erro ao excluir usuário:', error);
	}
}

export default router;