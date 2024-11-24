import express from 'express';
import cors from 'cors';

import { config } from './config';

import { createAuthRouter } from './routes/auth.routes';
import { createTodoRouter } from './routes/todos.routes';
import { notFound } from './middlewares/notFound';
import { handlerError } from './middlewares/handlerError';

import type { IAuthService, ICRUDTodoService } from './interfaces';

export function createApp({
	authService,
	todoService,
}: {
	authService: IAuthService,
	todoService: ICRUDTodoService,
}) {
	const PORT = config.port;

	const app = express();

	app.use(express.json());
	app.use(cors());
	app.disable('x-powered-by');

	app.use('/api/auth', createAuthRouter({ authService }));
	app.use('/api/todos', createTodoRouter({ todoService }));
	app.use(notFound);

	app.use(handlerError);

	app.listen(PORT, () => {
		console.log(`Server listening at: http://localhost:${PORT}`);
	});
}
 