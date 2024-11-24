import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { IAuthService } from '../interfaces';

export const createAuthRouter = ({ authService }: { authService: IAuthService }) => {
	const router = Router();

	const authController = new AuthController({ authService });

	router.post('/login', authController.login);

	return router;
};
