import { ActionType } from "../action-types";
import { TodoAction } from "../actions";
import { Todo } from "../../models";
import { Dispatch } from "redux";

//actionCreators:
export const setTodos = (todos: Array<Todo>) => {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: ActionType.SET_TODO,
      payload: todos,
    });
  };
};

export function createTodo(newTodo: Todo) {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: ActionType.CREATE_TODO,
      payload: newTodo,
    });
  };
}

export const updateTodoStatus = (todoId: string, checked: boolean) => {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: ActionType.UPDATE_TODO_STATUS,
      payload: {
        todoId,
        checked,
      },
    });
  };
};

export function deleteTodo(todoId: string) {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: ActionType.DELETE_TODO,
      payload: todoId,
    });
  };
}

export const deleteAllTodos = () => {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: ActionType.DELETE_ALL_TODOS,
    });
  };
};

export const toggleAllTodos = (checked: boolean) => {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: ActionType.TOGGLE_ALL_TODOS,
      payload: checked,
    });
  };
};

export const updateTodoContent = (todoId: string, content: string) => {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: ActionType.UPDATE_TODO_CONTENT,
      payload: {
        todoId,
        content,
      },
    });
  };
};
