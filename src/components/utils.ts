import { Todo } from '../types/types';
import { isTodoActive } from '../utils';

// check if all todo statuses are completed. This will changed the checkbox state to checked in toolbar component.
export const checkToDoStatus = (todos: Todo[]) => !todos.filter((todo) => isTodoActive(todo)).length; // check if there are still active tasks.
