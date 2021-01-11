import setTodos from "./setTodos";
import create from "./create";
import toolBar from "./toolBar";
import deleteTodo from "./deleteTodo";
import editTodo from "./editTodo";

const initialState = {
  ...setTodos.initialState,
  ...create.initialState,
  ...toolBar.initialState,
  ...deleteTodo.initialState,
  ...editTodo.initialState,
};

const reducers = {
  ...setTodos.reducers,
  ...create.reducers,
  ...toolBar.reducers,
  ...deleteTodo.reducers,
  ...editTodo.reducers,
};

const actions = {
  ...setTodos.actions,
  ...create.actions,
  ...toolBar.actions,
  ...deleteTodo.actions,
  ...editTodo.actions,
};

export default {
  initialState,
  reducers,
  actions,
};
