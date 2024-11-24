import { ICRUDTodoService } from '../../interfaces/index.js';
import { CreateTodoDTO, Todo, UpdateTodoDTO, User } from '../../types/';
import { todos } from '../../mocks/todos';

export class TodoService implements ICRUDTodoService {

	getAll = async ({ userId }: { userId: User['id'] }) => {
		const myTodos = todos.filter(todo => todo.userId === userId);
		return myTodos;
	}

	getById = async ({ id }: { id: Todo['id'] }) => {
		const todo = todos.find(todo => todo.id === id);
		if (!todo) return null;
		return todo;
	}

	create = async ({ data, userId }: { data: CreateTodoDTO, userId: User['id'] }) => {
		const newTodo = {
			id: (Math.max(...todos.map(todo => parseInt(todo.id))) + 1).toString(),
			text: '',
			completed: false,
			...data,
			userId,
		};
		todos.push(newTodo);
		return newTodo;
	}

	update = async ({ id, data, userId }: { id: Todo['id'], data: UpdateTodoDTO, userId: User['id'] }) => {
		const todoIndex = todos.findIndex(todo => todo.id === id && todo.userId === userId);
		if (todoIndex === -1) return null;
		const updateTodo = {
			...todos[todoIndex],
			...data,
		};
		todos[todoIndex] = updateTodo;
		return updateTodo;
	}

	delete = async ({ id, userId }: { id: Todo['id'], userId: User['id'] }) => {
		const todoIndex = todos.findIndex(todo => todo.id === id && todo.userId === userId);
		if (todoIndex === -1) return null;
		const [deleteTodo] = todos.splice(todoIndex, 1);
		return deleteTodo;
	}
}
