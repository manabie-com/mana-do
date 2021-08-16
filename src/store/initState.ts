/**
 * Split initstate from reducer for clean 
 */
import {Todo} from '../models/todo';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}
export default initialState