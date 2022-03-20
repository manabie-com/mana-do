import Service from "service";
import { GetState, SetState } from "zustand";
import { CreateTodoDto, DeleteTodoDto, Todo, UpdateTodoDto } from "../todo.models";
import { ToggleAllTodosDto } from "./../todo.models";
import { TodoStoreState } from "./useTodoStore";

export interface TodoSlice {
  todos: Array<Todo>;
  fetchTodos: () => void;
  createTodo: (createTodoDto: CreateTodoDto) => void;
  updateTodo: (updateTodoDto: UpdateTodoDto) => void;
  toggleAllTodos: (toggleAllTodoDto: ToggleAllTodosDto) => void;
  deleteTodo: (deleteTodoDto: DeleteTodoDto) => void;
  deleteAllTodos: () => void;
}

const createTodoSlice = (set: SetState<TodoStoreState>, get: GetState<TodoStoreState>): TodoSlice => ({
  todos: [],

  fetchTodos: async () => {
    const fetchedTodos = await Service.getTodos();

    set({ todos: fetchedTodos });
  },

  createTodo: async (createTodoDto) => {
    const newTodo = await Service.createTodo(createTodoDto);

    set((prevState) => ({ ...prevState, todos: [...prevState.todos, newTodo] }));
  },

  updateTodo: async (updateTodoDto) => {
    const currentTodos = [...get().todos];

    const index = currentTodos.findIndex((todo) => todo.id === updateTodoDto.id);

    const updatedTodo = await Service.updateTodo(updateTodoDto);

    currentTodos[index] = updatedTodo;

    set({ todos: currentTodos });
  },

  toggleAllTodos: async (toggleAllTodoDto) => {
    const todosResponse = await Service.toggleAllTodos(toggleAllTodoDto);

    set({ todos: todosResponse });
  },

  deleteTodo: async (deleteTodoDto) => {
    const deletedId = await Service.deleteTodo(deleteTodoDto);

    set((prevState) => ({
      ...prevState,
      todos: prevState.todos.filter((todo) => todo.id !== deletedId),
    }));
  },

  deleteAllTodos: async () => {
    await Service.deleteAllTodos();

    set({ todos: [] });
  },
});

export default createTodoSlice;
