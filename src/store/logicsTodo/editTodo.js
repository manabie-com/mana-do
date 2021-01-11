import { TodoStatus } from "../../constant";
import { getLogger } from "../../utils";
// const { logBefore, logAfter } = getLogger("DEV");
const { logBefore, logAfter } = getLogger(); // On when Done

const CURRENT_EDIT = "CURRENT_EDIT";
const CONTENT_EDIT = "CONTENT_EDIT";
const ON_SAVE_TODO = "ON_SAVE_TODO";
const TOGGLE_TODO_ITEM = "TOGGLE_TODO_ITEM";
const TOGGLE_ALL_TODO = "TOGGLE_ALL_TODO";

const initialState = {
  currentEdit: null,
  contentEdit: "",
};

const reducers = {};

reducers[CURRENT_EDIT] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, currentEdit: payload };
  logAfter(res, type);
  return res;
};

reducers[CONTENT_EDIT] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, contentEdit: payload };
  logAfter(res, type);
  return res;
};

reducers[ON_SAVE_TODO] = (state, payload, type) => {
  logBefore(state, payload, type);
  const newTodo = [...state.todos] || [];
  newTodo[payload].content = state.contentEdit;
  const res = { ...state, todos: newTodo };
  logAfter(res, type);
  return res;
};

reducers[TOGGLE_TODO_ITEM] = (state, payload, type) => {
  logBefore(state, payload, type);
  const newTodos = [...state.todos] || [];
  const { todoIndex, newStatus } = payload;
  if (newTodos[todoIndex] && newTodos[todoIndex].status) {
    newTodos[todoIndex].status = newStatus;
  }
  const res = { ...state, todos: newTodos };
  logAfter(res, type);
  return res;
};

reducers[TOGGLE_ALL_TODO] = (state, payload, type) => {
  logBefore(state, payload, type);
  const newTodos = [...state.todos] || [];
  newTodos.forEach((todo) => (todo.status = payload));
  const res = { ...state, todos: newTodos };
  logAfter(res, type);
  return res;
};

const actions = {
  setCurrentEdit: (dispatch) => (payload) =>
    dispatch({ type: CURRENT_EDIT, payload }),
  onChangeContentEdit: (dispatch) => (payload) =>
    dispatch({ type: CONTENT_EDIT, payload }),
  onSaveEdit: (dispatch) => (payload) =>
    dispatch({ type: ON_SAVE_TODO, payload }),
  toggleTodo: (dispatch) => (payload) =>
    dispatch({ type: TOGGLE_TODO_ITEM, payload }),
  setActiveAll: (dispatch) => () =>
    dispatch({ type: TOGGLE_ALL_TODO, payload: TodoStatus.ACTIVE }),
  setCompletedAll: (dispatch) => () =>
    dispatch({ type: TOGGLE_ALL_TODO, payload: TodoStatus.COMPLETED }),
};

export default {
  initialState,
  reducers,
  actions,
};
