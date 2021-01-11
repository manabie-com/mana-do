import { getLogger } from "../../utils";
// const { logBefore, logAfter } = getLogger("DEV");
const { logBefore, logAfter } = getLogger(); // On when Done

const SET_TODOS = "SET_TODOS";
const initialState = { todos: [] };

const reducers = {};

reducers[SET_TODOS] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, todos: payload };
  logAfter(res, type);
  return res;
};

const actions = {
  setTodos: (dispatch) => (payload) => dispatch({ type: SET_TODOS, payload }),
};

export default {
  initialState,
  reducers,
  actions,
};
