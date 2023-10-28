type Role = 'admin' | 'editor' | 'viewer';
import { User } from '@prisma/client';

function checkRole(req: { role: Role, user: User }, allowedRoles: Role[], next: () => void, error: () => void) {
	if (allowedRoles.includes(req.user.role)) {
		next();
	} else {
		error();
	}
}

const req = {
	role: 'admin' as Role, 
	user: {
		role: 'admin' as Role 
	}
};

const allowedRoles: Role[] = ['admin', 'editor'];

function handleNext() {
	console.log('Permissão concedida. Próximo passo...');
}

function handleError() {
	console.error('Erro de permissão. Acesso negado.');
}

checkRole(req, allowedRoles, handleNext, handleError);

export default checkRole;
