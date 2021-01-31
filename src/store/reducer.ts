

import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO_CONTENT,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      if (state.todos.length <= 0) {
        state.todos = action.payload
      }
      return { ...state }
    case CREATE_TODO:
      const cloneTodo = [...state.todos]
      const index = state.todos.findIndex((todo) => todo.content === action.payload.content || todo.id === action.payload.id)
      //neu index bang -1 la khong tim thay content trung se them vao todos

      if (index === -1) {
        cloneTodo.push(action.payload)
        localStorage.setItem("localTodos", JSON.stringify(cloneTodo));
        console.log(cloneTodo, 'todos');
      }
      else {
        alert("You have aldready added it!")
      }
      return {
        ...state, todos: cloneTodo
      };
    case EDIT_TODO_CONTENT:
      state.todos = JSON.parse(localStorage.getItem("localTodos") || "")
      const newTodo = [...state.todos]
      const indexUpdate = state.todos.findIndex((todo) => todo.id === action.payload.todoId)
      if (indexUpdate !== -1) {
        newTodo[indexUpdate].content = action.payload.content
        localStorage.setItem("localTodos", JSON.stringify(newTodo))
        state.todos = newTodo
        alert("Cập nhật thành công!")
      }
      return { ...state, todos: state.todos }

    case UPDATE_TODO_STATUS:
      state.todos = JSON.parse(localStorage.getItem("localTodos") || "")
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem("localTodos", JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      localStorage.setItem("localTodos", JSON.stringify(tempTodos))
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const clone = [...state.todos]
      const indexDelete = state.todos.findIndex((todo) => { return todo.id === action.payload })

      // mang sau khi filter da loc bo phan tu muon xoa
      if (indexDelete !== -1) {
        clone.splice(indexDelete, 1)
        alert("Xóa thành công!")
      }
      localStorage.setItem("localTodos", JSON.stringify(clone))
      return {
        ...state, todos: clone
      }
    case DELETE_ALL_TODOS:
      state.todos = []
      localStorage.setItem("localTodos", JSON.stringify(state.todos))
      return {
        ...state
      }
    default:
      return state;
  }
}

export default reducer;