import { createDataContext } from "../utils";
import Auth from "./logicsAuth";
import Todos from "./logicsTodo";

const initialState = { ...Auth.initialState, ...Todos.initialState };

const reducers = { ...Auth.reducers, ...Todos.reducers };

const actions = { ...Auth.actions, ...Todos.actions };

const reducer = (state, action) => {
  const { type, payload } = action;
  if (typeof reducers[type] === "function") {
    // looking for reducer
    // Call refucer with state, payload, and type
    const newState = reducers[type](state, payload, type);
    if (
      typeof newState === "object" &&
      newState !== null &&
      !Array.isArray(newState)
    ) {
      // return newState
      return newState;
    }
    // return state if reducer is not return a object
    return state;
  }
  //  return state if reducer is not a function
  return state;
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  initialState
);

export default Context;
