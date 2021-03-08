import React, { createContext, useReducer } from "react";
import { Todo, TodoStatus } from "../models/todo";
import { AppActions } from "../store/actions";
import reducer, { initialState } from "../store/reducer";

export type EnhanceTodoStatus = TodoStatus | "ALL";
export const TodosContext = createContext<
  Partial<{
    todos: Array<Todo>;
    todosDispatch: React.Dispatch<AppActions>;
    showing: EnhanceTodoStatus;
  }>
>({});

const ContextProvider: React.FC = ({ children }) => {
  const [{ todos, showing }, todosDispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={{ todos, showing, todosDispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export default ContextProvider;
