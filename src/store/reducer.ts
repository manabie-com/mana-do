import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // Vì push là một mutable method nên lúc dùng push nó thay đổi luôn giá trị 
      // của state hiện tại nên gây ra bug, sử dụng một state mới copy từ state cũ 
      // rồi sửa đổi trên đó sau đố trả về state mới để tránh bug.
      const newState: AppState = { ...state, todos: [...state.todos, action.payload] };
      localStorage.setItem('todos', JSON.stringify(newState.todos));
      
      return {
        ...newState
      };
    case SET_TODO:

      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || "[]");

      return {
        ...state,
        todos: [...state.todos, ...action.payload,...todos]
      };
    case UPDATE_TODO_STATUS:
      // Không set trực tiếp giá trị vào state hiện tại, sử dụng một state mới copy từ state cũ.
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);

      const newState2: AppState = { ...state };
      
      newState2.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem('todos', JSON.stringify([...newState2.todos]));

      return {
        ...newState2,
      }
    case UPDATE_TODO:
      // Tim giá trị của el bằng cách tìm index của nó, sau đó sửa nó trên state mới 
      // được copy từ state cũ rồi return
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const newState3: AppState = { ...state };
      newState3.todos[index3].content = action.payload.content;
      localStorage.setItem('todos', JSON.stringify([...newState3.todos]));

      return { ...newState3 };
    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      localStorage.setItem('todos', JSON.stringify([...tempTodos]));
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      // Tương tự add to do, splice là mutable method nên gây ra bug
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
    
      localStorage.setItem('todos', JSON.stringify([...state.todos.slice(0, index1), ...state.todos.slice(index1 + 1)]));

      return {
        ...state,
        todos: [...state.todos.slice(0, index1), ...state.todos.slice(index1 + 1)]
      };
    case DELETE_ALL_TODOS:
      localStorage.clear();
      
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;