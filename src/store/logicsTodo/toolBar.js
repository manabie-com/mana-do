import { getLogger } from "../../utils";
const { logBefore, logAfter } = getLogger("DEV");
// const { logBefore, logAfter } = getLogger(); // On when Done

const SHOWING = "SHOWING";

const initialState = { showing: "" };

const reducers = {};

reducers[SHOWING] = (state, payload, type) => {
  logBefore(state, payload, type);
  const res = { ...state, showing: payload };
  logAfter(res, type);
  return res;
};

const actions = {
  setShowing: (dispatch) => (payload) => dispatch({ type: SHOWING, payload }),
};

export default {
  initialState,
  reducers,
  actions,
};
