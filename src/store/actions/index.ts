import { TodoActions as TodoActionsType } from './todos.action';

export {
  deleteAllTodos,
  deleteTodo,
  setTodos,
  updateAllTodosStatus,
  updateTodoStatus,
  updateTodoContent,
} from './todos.action';

export type TodoActions = TodoActionsType;
