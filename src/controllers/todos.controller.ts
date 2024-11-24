import type { NextFunction, Request, Response } from 'express';

import { ICRUDController, ICRUDTodoService } from '../interfaces';
import { validatePartialTodo } from '../schemas/todo';

export class TodoController implements ICRUDController {
	readonly #todoService;

	constructor({ todoService }: { todoService: ICRUDTodoService }) {
		this.#todoService = todoService;
	}

	getAll = async (req: Request, res: Response) => {
		const { userId } = req;
		const todos = await this.#todoService.getAll({ userId });
		res.status(200).json({
			data: todos,
		});
	};

	getById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req;
			const { id } = req.params;
			const todo = await this.#todoService.getById({ id, userId });

			if (!todo) {
				res.status(404).json({ message: 'Todo not found' })
				return;
			}

			res.status(200).json({
				data: todo,
			});
		} catch (error) {
			next(error);
		}
	};

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result: any = validatePartialTodo(req.body);
			if (result.error) {
				res.status(400).json({ error: JSON.parse(result.error.message) })
				return;
			}
			const { userId } = req;
			const newTodo = await this.#todoService.create({ data: result.data, userId });

			res.status(201).json({
				message: 'Todo created',
				data: newTodo,
			});
		} catch (error) {
			next(error);
		}
	};

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result: any = validatePartialTodo(req.body);
			if (result.error) {
				res.status(400).json({ error: JSON.parse(result.error.message) });
				return;
			}

			const { id } = req.params;
			const { userId } = req;
			const updateTodo = await this.#todoService.update({ id, data: result.data, userId});
			if (!updateTodo) {
				res.status(404).json({ message: 'Todo not found' });
				return;
			}

			res.status(200).json({
				message: 'Todo updated',
				data: updateTodo,
			});
		} catch (error) {
			next(error);
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const { userId } = req;

			const deleteTodo = await this.#todoService.delete({ id, userId });
			if (!deleteTodo) {
				res.status(404).json({ message: 'Todo not found' });
				return;
			}

			res.status(200).json({
				message: 'Todo deleted',
				data: deleteTodo,
			});
		} catch (error) {
			next(error);
		}
	};
}
