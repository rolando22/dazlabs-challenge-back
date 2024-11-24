import type { NextFunction, Request, Response } from 'express';

import type { IAuthController, IAuthService } from '../interfaces';
import { validationAuth } from '../schemas/auth';

export class AuthController implements IAuthController {
	readonly #authService;

	constructor({ authService }: { authService: IAuthService }) {
		this.#authService = authService;
	}

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result: any = validationAuth(req.body);

			if (result.error) {
				res.status(400).json({ error: JSON.parse(result.error.message) });
				return;
			}

			const data = await this.#authService.login({ email: result.data.email, password: result.data.password });
			if (!data) {
				res.status(401).json({ error: 'invalid user or password' })
				return;
			}

			const { user, token } = data;

			res.json({ 
				data: { ...user, token }, 
			});
		} catch (error) {
			next(error);
		}
	};
}
