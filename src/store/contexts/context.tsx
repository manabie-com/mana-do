import React from "react";
import { TodoStatus } from "../../models/todo";
import { AppActions } from "../actions/todoActions";
import reducer from "../reducers/todoReducers";
import { ITodoType } from "../types/todoType";

export const TodoContext = React.createContext([{}, {}] as [
  ITodoType,
  React.Dispatch<AppActions>
]);

const initialState: ITodoType = {
  loading: false,
  todos: [
    {
      id: "1",
      user_id: "123",
      content: "Hihihihi",
      status: TodoStatus.ACTIVE,
      created_date: "Today 12:00AM",
    },
    {
      id: "2",
      user_id: "asd",
      content: "This is the content of the todo",
      status: TodoStatus.COMPLETED,
      created_date: "Today 12:00AM",
    },
    {
      id: "3",
      user_id: "zxc",
      content:
        "Lorem ipsum dolor lidur mother fucker\nYeah this is the mfking down lined",
      status: TodoStatus.ACTIVE,
      created_date: "Today 13:00PM",
    },
  ],
};

const TodoProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={[state, dispatch]}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
