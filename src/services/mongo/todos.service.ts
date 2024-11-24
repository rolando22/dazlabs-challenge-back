import { TodoModel } from '../../db/mongo/models/Todo';

import { ICRUDTodoService } from '../../interfaces';
import { CreateTodoDTO, Todo, UpdateTodoDTO, User } from '../../types';

export class TodoService implements ICRUDTodoService {

	getAll = async({ userId }: { userId: User['id'] }) => {
		const todos = await TodoModel.find({ _id: userId });
		return todos;
	}

	getById = async ({ id }: { id: Todo['id'] }) => {
		const todo = await TodoModel.findById(id);
		if (!todo) return null;
		return todo;
	}

	create = async({ data, userId }: { data: CreateTodoDTO, userId: User['id'] }) => {
		const newTodo = new TodoModel({ 
			text: '',
			completed: false, 
			...data, 
			userId, 
		});
		const savedTodo = await newTodo.save();
		return savedTodo;
	}

	update = async({ id, data, userId }: { id: Todo['id'], data: UpdateTodoDTO, userId: User['id'] }) => {
		const updatedTodo = await TodoModel.findOneAndUpdate({ _id: id, userId }, { ...data }, { new: true });
		if (!updatedTodo) return null;
		return updatedTodo;
	}

	delete = async({ id, userId }: { id: Todo['id'], userId: User['id'] }) => {
		const deletedTodo = await TodoModel.findOneAndDelete({ _id: id, userId });
		if (!deletedTodo) return null;
		return deletedTodo;
	}
}
