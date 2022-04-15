import { Todo } from '../models/todo'

export interface AppState {
  isLoading: Boolean
  isCreating: Boolean
  isUpdating: Boolean
  todos: Array<Todo>
}
