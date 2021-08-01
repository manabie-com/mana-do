import { Dispatch, useReducer } from "react";
import { ITodoActions, ITodoState } from "./todo.constant";
import applyMiddleware from "./todo.middleware";
import todoReducer, { initialState } from "./todo.reducer";

const useTodoReducer = (): [ITodoState, Dispatch<ITodoActions>] => {
  const [state, dispatch]: [ITodoState, Dispatch<ITodoActions>] = useReducer(
    todoReducer,
    initialState
  );
  const enhancedDispatch = applyMiddleware(dispatch);
  return [state, enhancedDispatch];
};

export default useTodoReducer;
