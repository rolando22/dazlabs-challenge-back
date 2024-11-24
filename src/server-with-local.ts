import { createApp } from './index';
import { AuthService } from './services/local-file-system/auth.service';
import { TodoService } from './services/local-file-system/todos.service';

const authService = new AuthService();
const todoService = new TodoService();

createApp({ authService, todoService });
