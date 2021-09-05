import * as types from "./Todo.constants"
import produce from "immer"
import { TodoStatus, Todo } from 'models/todo';

interface AppState {
  todoList: Array<Todo>
}
const initialState: AppState = {
  todoList: [],
}

export const todoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CREATE_TODO:
        draft.todoList = [...state.todoList, action.payload]
        break
      case types.SET_TODO_LIST:
        draft.todoList = action.payload 
        break
      case types.TOGGLE_ALL_TODO_LIST:
        const tempTodoList = state.todoList.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
         })
        draft.todoList = tempTodoList
        break
      default:
        return state
    }
  })
