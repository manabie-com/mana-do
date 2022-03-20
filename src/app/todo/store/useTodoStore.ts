import create from "zustand";

import createTodoSlice, { TodoSlice } from "./createTodoSlice";
import createFilterTodoSlice, { FilterTodoSlice } from "./createFilterTodoSlice";

export type TodoStoreState = TodoSlice & FilterTodoSlice;

export const useTodoStore = create<TodoStoreState>((set, get) => ({
  ...createTodoSlice(set, get),
  ...createFilterTodoSlice(set, get),
}));

export default useTodoStore;
