import {Todo, TodoStatus} from '../../models/todo';
import {
  TodoActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO_CONTENT
} from '../actions/todo';

export interface TodoState {
  todos: Array<Todo>
}

export const initialState: TodoState = {
  todos: []
}

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const todoReducer = (state: TodoState = initialState, action: TodoActions): TodoState => {
  console.log(action.type)
  switch (action.type) {
    case SET_TODO:
      state.todos = action.payload
      saveTodos(state.todos)
      return {
        ...state,
    }

    case CREATE_TODO:
      state.todos.push(action.payload);
      saveTodos(state.todos)
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      saveTodos(state.todos)
      return {
        ...state,
        todos: state.todos
      }
    
    case UPDATE_TODO_CONTENT: 
      const index = state.todos.findIndex(i => i.id == action.payload.id);
      state.todos[index].content = action.payload.content
      saveTodos(state.todos)
      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);
      saveTodos(state.todos)
      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      saveTodos([])
      return {
        ...state,
        todos: []
      }
    default:
      localStorage.setItem("todos", JSON.stringify(state.todos))
      return state;
  }
}

export default todoReducer;