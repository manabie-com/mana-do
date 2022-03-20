import { GetState, SetState } from "zustand";

import { TodoStatus } from "../todo.models";
import { TodoStoreState } from "./useTodoStore";

export interface FilterTodoSlice {
  showStatus: TodoStatus;
  setShowStatus: (status: TodoStatus) => void;
}

const createFilterTodoSlice = (set: SetState<TodoStoreState>, get: GetState<TodoStoreState>): FilterTodoSlice => ({
  showStatus: TodoStatus.ALL,
  setShowStatus: (status) => {
    set((prevState) => ({ ...prevState, showStatus: status }));
  },
});

export default createFilterTodoSlice;
