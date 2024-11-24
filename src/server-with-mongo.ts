import { createApp } from './index';
import './db/mongo';
import { AuthService } from './services/mongo/auth.service';
import { TodoService } from './services/mongo/todos.service';

const authService = new AuthService();
const todoService = new TodoService();

createApp({ authService, todoService });
