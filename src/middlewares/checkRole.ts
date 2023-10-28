import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!roles.includes(req.user.role)) {
				return res.status(401).json('Você não tem permissão para realizar essa ação.');
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};