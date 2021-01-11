import { getLogger } from "../../utils";
// const { logBefore, logAfter } = getLogger("DEV");
const { logBefore, logAfter } = getLogger(); // On when Done

const ON_CONTENT_CHANGE = "ON_CONTENT_CHANGE";
const CREATE_TODO = "CREATE_TODO";

const initialState = { content: "" };

const reducers = {};
reducers[ON_CONTENT_CHANGE] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, content: payload };
  logAfter(res, type);
  return res;
};

reducers[CREATE_TODO] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, todos: [...state.todos, payload], content: "" };
  logAfter(res, type);
  return res;
};

const actions = {
  onChangeContent: (dispatch) => (payload) =>
    dispatch({ type: ON_CONTENT_CHANGE, payload }),
  createTodo: (dispatch) => (payload) =>
    dispatch({ type: CREATE_TODO, payload }),
};

export default {
  initialState,
  reducers,
  actions,
};
