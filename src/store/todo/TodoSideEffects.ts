import {Dispatch} from 'react';
import service from '../../service';
import TodoActionsCreator, {
  ACTION_TYPES,
  ITodoActions,
  IAddTodoAction,
  IUpdateTodoAction,
  IRemoveTodoAction, IRearrangeTodosAction, IUpdateAllTodosStatusAction,
} from './TodoActions';


export const handleFetchTodos = (dispatch: Dispatch<ITodoActions>) => {
  return service.getTodos()
    .then(todos => {
      dispatch(TodoActionsCreator.fetchTodosSucceed(todos));
    })
    .catch(e => {
      dispatch(TodoActionsCreator.fetchTodosFailed(e.message))
    })
}

export const handleAddTodo = (dispatch: Dispatch<ITodoActions>, action: ITodoActions) => {
  const {content} = action as IAddTodoAction;
  return service.createTodo(content)
    .then(todo => {
      dispatch(TodoActionsCreator.addTodoSucceed(todo));
    })
    .catch(e => {
      dispatch(TodoActionsCreator.addTodoFailed(e.message));
    })
}

export const handleUpdateTodo = (dispatch: Dispatch<ITodoActions>, action: ITodoActions) => {
  const {content, status, id} = action as IUpdateTodoAction;
  return service.updateTodo(id, content, status)
    .then(todo => {
      dispatch(TodoActionsCreator.updateTodoSucceed(todo));
    })
    .catch(e => {
      dispatch(TodoActionsCreator.updateTodoFailed(e.message));
    })
}

export const handleRemoveTodo = (dispatch: Dispatch<ITodoActions>, action: ITodoActions) => {
  const {id} = action as IRemoveTodoAction;
  return service.removeTodo(id)
    .then(id => {
      dispatch(TodoActionsCreator.removeTodoSucceed(id));
    })
    .catch(e => {
      dispatch(TodoActionsCreator.removeTodoFailed(e.message));
    })
}

export const handleRearrangeTodos = (dispatch: Dispatch<ITodoActions>, action: ITodoActions) => {
  const {todos} = action as IRearrangeTodosAction;
  return service.updateTodos(todos)
    .then(todos => {
      dispatch(TodoActionsCreator.rearrangeTodoSucceed(todos));
    })
    .catch(e => {
      dispatch(TodoActionsCreator.rearrangeTodoFailed(e.message));
    })
}

export const handleRemoveAllTodos = (dispatch: Dispatch<ITodoActions>) => {
  return service.updateTodos([])
    .then(() => {
      dispatch(TodoActionsCreator.removeAllTodosSucceed());
    })
    .catch(e => {
      dispatch(TodoActionsCreator.removeAllTodosFailed(e.message));
    })
}

export const handleUpdateAllTodosStatus = (dispatch: Dispatch<ITodoActions>, action: ITodoActions) => {
  const {status, todos} = action as IUpdateAllTodosStatusAction;
  todos.forEach(todo => {
    todo.status = status;
  });
  return service.updateTodos(todos)
    .then(todos => {
      dispatch(TodoActionsCreator.updateAllTodosStatusSucceed(todos));
    })
    .catch(e => {
      dispatch(TodoActionsCreator.updateAllTodosStatusFailed(e.message));
    })
}

export const applyTodoSideEffectsMiddleWare = (dispatch: Dispatch<ITodoActions>) => (
  action: ITodoActions
) => {
  dispatch(action);
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO: {
      handleAddTodo(dispatch, action);
      break;
    }
    case ACTION_TYPES.FETCH_TODOS: {
      handleFetchTodos(dispatch);
      break;
    }
    case ACTION_TYPES.UPDATE_TODO: {
      handleUpdateTodo(dispatch, action);
      break;
    }
    case ACTION_TYPES.REMOVE_TODO: {
      handleRemoveTodo(dispatch, action);
      break;
    }
    case ACTION_TYPES.REARRANGE_TODOS: {
      handleRearrangeTodos(dispatch, action);
      break;
    }
    case ACTION_TYPES.REMOVE_ALL_TODOS: {
      handleRemoveAllTodos(dispatch);
      break;
    }
    case ACTION_TYPES.UPDATE_ALL_TODOS_STATUS: {
      handleUpdateAllTodosStatus(dispatch, action);
      break;
    }
  }
};

