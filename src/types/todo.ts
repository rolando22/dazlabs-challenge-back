export interface Todo {
  id: string
  text: string
  completed: boolean
  userId: string
}

export interface CreateTodoDTO extends Omit<'Todo', 'completed' | 'userId'> {}
export interface UpdateTodoDTO extends Omit<'Todo', 'userId'> {}
