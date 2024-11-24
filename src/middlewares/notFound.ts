import type { Request, Response } from 'express';

export const notFound = (req: Request, res: Response) => {
	res.status(404).end();
};
