import { Todo } from "../../types/types";
import { isTodoActive } from "../../utils";

export const getActiveToDos = (todos: Todo[]) => todos.filter((todo) => isTodoActive(todo));
