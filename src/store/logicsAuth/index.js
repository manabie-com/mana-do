import { getLogger } from "../../utils";
// const { logBefore, logAfter } = getLogger("DEV");
const { logBefore, logAfter } = getLogger(); // On when Done

const USER_ID = "USER_ID";
const USER_PASSWORD = "USER_PASSWORD";
const SET_USER_ID = "SET_USER_ID";
const SET_ERR_MGS = "SET_ERR_MGS";

const initialState = {
  userId: "",
  password: "",
  // userId: "firstUser",
  // password: "example",
  errMgs: null,
  user_id: null,
};

const reducers = {};

reducers[USER_ID] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, userId: payload };
  logAfter(res, type);
  return res;
};

reducers[USER_PASSWORD] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, password: payload };
  logAfter(res, type);
  return res;
};

reducers[SET_USER_ID] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, user_id: payload };
  logAfter(res, type);
  return res;
};

reducers[SET_ERR_MGS] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, errMgs: payload };
  logAfter(res, type);
  return res;
};

const actions = {
  onChangeUID: (dispatch) => (payload) => dispatch({ type: USER_ID, payload }),
  onChangeUPass: (dispatch) => (payload) =>
    dispatch({ type: USER_PASSWORD, payload }),

  clearID: (dispatch) => () => dispatch({ type: USER_ID, payload: "" }),
  clearPass: (dispatch) => () => dispatch({ type: USER_PASSWORD, payload: "" }),

  setUserID: (dispatch) => (payload) =>
    dispatch({ type: SET_USER_ID, payload }),
  setErrMgs: (dispatch) => (payload) =>
    dispatch({ type: SET_ERR_MGS, payload }),
};

export default {
  initialState,
  reducers,
  actions,
};
