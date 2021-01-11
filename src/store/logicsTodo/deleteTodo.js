import { getLogger } from "../../utils";
const { logBefore, logAfter } = getLogger("DEV");
// const { logBefore, logAfter } = getLogger(); // On when Done

const DELETE_ALL = "DELETE_ALL";
const DELETE = "DELETE";

const initialState = {};

const reducers = {};

reducers[DELETE_ALL] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, todos: [], showing: "" };
  logAfter(res, type);
  return res;
};

reducers[DELETE] = (state, payload, type) => {
  logBefore(state, payload, type);
  const newTodos = [...state.todos];
  newTodos.splice(payload, 1);
  const res = { ...state, todos: newTodos };
  logAfter(res, type);
  return res;
};

const actions = {
  deleteAllTodos: (dispatch) => () => dispatch({ type: DELETE_ALL }),
  onDeleteTodo: (dispatch) => (payload) => dispatch({ type: DELETE, payload }),
};

export default {
  initialState,
  reducers,
  actions,
};
