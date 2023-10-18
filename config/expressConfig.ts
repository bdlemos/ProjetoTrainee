import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import UserRouter from '../src/domains/User/controller/UserController';
import SongRouter from '../src/domains/Song/controller/songController';

dotenv.config();

export const app: Express = express();

const options : CorsOptions = {
	credentials: true,
	origin: process.env.APP_URL
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use('/api/users', UserRouter);
app.use('/api/songs', SongRouter);

export default app;

