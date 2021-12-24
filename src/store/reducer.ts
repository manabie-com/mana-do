import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  KEY_EDIT_TODO,
  START_EDIT_TODO,
  END_EDIT_TODO,
  CANCEL_EDIT_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from './actions';

export interface AppState {
  todos: Array<Todo>,
  editIndex: any,
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]') || [], // lấy data từ localStorage
  editIndex: null, //Thêm editIndex để tiến hành edit
}

function reducer(state: AppState, action: AppActions): AppState {
  console.log('Action: ', action);
  console.log('Prev state: ', state);
  switch (action.type) {
    // Thêm SET_TODO
    case SET_TODO:
      return {
        ...state,
        todos: [...state.todos]
      };

      // Sửa lại case CREATE_TODO: ban đầu khi add thêm 1, từ lần 2 add tăng 2 todo => sửa lại add 1 todo mỗi lần add
    case CREATE_TODO:
      // state.todos.push(action.payload);
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

      // START_EDIT_TODO case bắt đầu edit
    case START_EDIT_TODO:
      state.editIndex = action.payload
      return {
        ...state,
        todos: [...state.todos],
        editIndex: state.editIndex
      };

      // KEY_EDIT_TODO case xử lý keyCode
    case KEY_EDIT_TODO:
      state.editIndex = null;
      return {
        ...state,
        todos: [...state.todos],
        editIndex: state.editIndex
      };

      // END_EDIT_TODO kiểm tra editIndex khác null và có title => tìm vị trí và gán bằng title mới
    case END_EDIT_TODO:
      if(state.editIndex !== null) {
        if(action.payload.title) {
          state.todos[state.editIndex].content = action.payload.title
        } else {

        }
        
      }
      return {
        ...state,
        todos: [...state.todos],
      };

      // Huỷ edit
    case CANCEL_EDIT_TODO:
      state.editIndex = false;
      return {
        todos: [...state.todos],
        editIndex: state.editIndex
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem('todos', JSON.stringify(state.todos))
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

      // Delete todo
    case DELETE_TODO:
      // const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      // state.todos.splice(index1, 1);

      // Clone lại todos vào newTodos
      const newTodos = [...state.todos];
      // Tìm index có id trùng với id payload trả về
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload)
      // Cắt index từ mảng mới
      newTodos.splice(index1, 1);

      return {
        ...state,
        todos: newTodos //return mảng mới
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;