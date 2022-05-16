import { AppState } from '../../../store';

export const selectTodo = (state: AppState) => state.todos.todoList || [];

export default {
  selectTodo,
};
