import {
  CreateTodoAction,
  createTodoSuccess,
  CreateTodoSuccessAction,
  CREATE_TODO,
  DeleteTodoAction,
  deleteTodoSuccess,
  DeleteTodoSuccessAction,
  DELETE_TODO,
  getTodosSuccess,
  GetTodoSuccessAction,
  GET_TODOS,
} from './actions';
import Service from '../service';

interface Jobs {
  [key: string]: Function;
}

const getTodos = async (
  _: any,
  dispatch: React.Dispatch<GetTodoSuccessAction>
) => {
  const resp = await Service.getTodos();
  dispatch(getTodosSuccess(resp));
};

const createTodo = async (
  action: CreateTodoAction,
  dispatch: React.Dispatch<CreateTodoSuccessAction>
) => {
  const resp = await Service.createTodo(action.payload);
  dispatch(createTodoSuccess(resp));
};

const deleteTodo = async (
  action: DeleteTodoAction,
  dispatch: React.Dispatch<DeleteTodoSuccessAction>
) => {
  await Service.deleteTodo(action.payload);
  dispatch(deleteTodoSuccess(action.payload));
};

const jobs: Jobs = {
  [GET_TODOS]: getTodos,
  [CREATE_TODO]: createTodo,
  [DELETE_TODO]: deleteTodo,
};

export default jobs;
