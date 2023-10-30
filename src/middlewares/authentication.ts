import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import UserService from '../domains/User/service/UserService';
import {Request, Response, NextFunction } from 'express';
import statusCodes from '../../utils/constants/statusCode';
import { PermissionError } from '../../errors/PermissionError';
import bcrypt from 'bcrypt';

const generateJWT = (user:User) => {
    const secret:string = process.env.JWT_SECRET || '';
    const expires:string = process.env.JWT_EXPIRATION || '';
    const token = jwt.sign({ user }, 'secret', { expiresIn: '7d' });
    return token;
}

const loginMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await UserService.getByEmail(req.body.email);
        if (!user) {
            res.status(statusCodes.BAD_REQUEST).json('E-mail não cadastrado!');
            throw new PermissionError('E-mail não cadastrado!');
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(statusCodes.BAD_REQUEST).json('Senha incorreta!');
            throw new PermissionError('Senha incorreta!');
        }
        const token = generateJWT(user);
        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(statusCodes.SUCCESS).json('Login efetuado com sucesso!');
    } catch (error) {
        res.status(statusCodes.UNAUTHORIZED);
        next(error);
    }
}

const logoutMiddleware = (req:Request, res:Response, next:NextFunction) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(statusCodes.SUCCESS).json('Logout efetuado com sucesso!');
    next();
}

const notLogged = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
        res.status(statusCodes.UNAUTHORIZED);
        throw new PermissionError('Usuário já autenticado!');
    }
    next();
}

const verifyJWT = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(statusCodes.UNAUTHORIZED);
        throw new PermissionError('Usuário não autenticado!');
    }
    try {
        const secret:string = process.env.JWT_SECRET || '';
        const decoded = jwt.verify(token, 'secret');
        if (typeof decoded !== 'string') {
          req.user = decoded.user;
        }
        next();
    } catch (error) {
        if (error instanceof PermissionError) {
            res.status(statusCodes.UNAUTHORIZED);
            throw new PermissionError('Token expirado!');
        }
        res.status(statusCodes.UNAUTHORIZED);
        throw new PermissionError('Usuário não autenticado!');
    }
}

export { loginMiddleware, generateJWT, verifyJWT, notLogged, logoutMiddleware };