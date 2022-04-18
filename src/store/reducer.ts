import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  SET_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SHOW_EDIT_FORM_TODO,
  CLOSE_EDIT_FORM,
  UPDATE_TODO_CONTENT,
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
      return {
        ...state,
        todos: action.payload
      }

    case CREATE_TODO:
      if (!state.todos.includes(action.payload)) { //Fix duplicate object when pushing to array
        state.todos.push(action.payload);
        localStorage.setItem('todo-manabie', JSON.stringify(state.todos) as any);
      }

      return {
        ...state,
        todos: state.todos
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      localStorage.setItem('todo-manabie', JSON.stringify(state.todos) as any);
      return {
        ...state,
        todos: state.todos
      }
    
    case UPDATE_TODO_CONTENT:
      const idxEdit = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[idxEdit].content = action.payload.content;
      state.todos[idxEdit].editContent = false;
      
      localStorage.setItem('todo-manabie', JSON.stringify(state.todos) as any);
      return {
        ...state,
        todos: state.todos
      }

    case SHOW_EDIT_FORM_TODO:
      const idx = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos.map((item) => item.editContent = false);
      state.todos[idx].editContent = true;

      return {
        ...state,
        todos: state.todos
      }
    
    case CLOSE_EDIT_FORM:
      state.todos.map((item) => item.editContent = false);
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
      // const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      // state.todos.splice(index1, 1);
      const temptState = state.todos.filter((item) => {
        return item.id !== action.payload
      });

      localStorage.setItem('todo-manabie', JSON.stringify(temptState) as any); // Save to local storage after remove item todo
      
      return {
        ...state,
        todos: temptState
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem('todo-manabie', JSON.stringify([]) as any);
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;