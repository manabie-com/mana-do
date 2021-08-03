import { Dispatch, useReducer } from "react";
import { TodoActions } from "./actions";
import applyMiddleware from "./middleware";
import todoReducer, { TodoState, initialState } from "./reducer";

const useTodoReducer = (): [TodoState, Dispatch<TodoActions>] => {
  const [state, dispatch]: [TodoState, Dispatch<TodoActions>] = useReducer(todoReducer, initialState);
  const middlewareEnhancer = applyMiddleware(dispatch);
  return [state, middlewareEnhancer];
};

export default useTodoReducer;