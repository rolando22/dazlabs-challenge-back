import type { NextFunction, Request, Response } from 'express';
import { DocumentType } from '@typegoose/typegoose';

import { UserSchema } from '../db/mongo/models/User';
import { TodoSchema } from '../db/mongo/models/Todo';
import { CreateTodoDTO, Login, Todo, UpdateTodoDTO, User } from '../types';

export interface ICRUDTodoService {
	getAll: ({ userId }: { userId: User['id'] }) => Promise<Todo[] | DocumentType<TodoSchema>[]>;
	getById: ({ id, userId }: { id: Todo['id'], userId: User['id'] }) => Promise<Todo | DocumentType<TodoSchema> | null>;
	create: ({ data, userId }: { data: CreateTodoDTO, userId: User['id'] }) => Promise<Todo | DocumentType<TodoSchema>>;
	update: ({ id, data, userId }: { id: Todo['id'], data: UpdateTodoDTO, userId: User['id'] }) => Promise<Todo | DocumentType<TodoSchema> | null>;
	delete: ({ id, userId }: { id: Todo['id'], userId: User['id'] }) => Promise<Todo | DocumentType<TodoSchema> | null>;
}

export interface IAuthService {
	login: ({ email, password }: Login) => Promise<{ user: User | DocumentType<UserSchema>, token: string } | null>;
}

export interface ICRUDController {
	getAll: (req: Request, res: Response) => Promise<void>;
	getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface IAuthController {
	login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
