import { stringify } from 'querystring';
import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
  SET_TODO,
  SET_DATA
} from './actions';

var localStorage: Storage
export interface AppState {
  todos: Array<Todo>,
  todosDoing: Array<Todo>,
  todosUrgent: Array<Todo>,
  todosDonot: Array<Todo>,
  todosDone: Array<Todo>,
  todosRemoved: Array<Todo>
}

export const initialState: AppState = {
  todos: [],
  todosDoing: [],
  todosUrgent: [],
  todosDonot: [],
  todosDone: [],
  todosRemoved: [],
}

const mappingData = (key: string, state: AppState) => {
  switch (key) {
    case "do":
      return { name: "todos", data: [...state["todos"]] };
    case "doing":
      return { name: "todosDoing", data: [...state["todosDoing"]] };
    case "urgent":
      return { name: "todosUrgent", data: [...state["todosUrgent"]] };
    case "donot":
      return { name: "todosDonot", data: [...state["todosDonot"]] };
    case "done":
      return { name: "todosDone", data: [...state["todosDone"]] };
    case "removed":
      return { name: "todosRemoved", data: [...state["todosRemoved"]] };
    default:
      return { name: 'nokey', data: [] }
  }
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos = [...state.todos, { ...action.payload }]
      try {
        localStorage.setItem("initialState", JSON.stringify(state));
      }
      catch (err) {
        console.log(err)
      };
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      if (action.payload.statusNew == action.payload.statusOld || action.payload.statusNew == "" || action.payload.statusOld == "") { return { ...state } }
      let dataNew = mappingData(action.payload.statusNew, state)
      let dataOld = mappingData(action.payload.statusOld, state)
      let stateUpdateNew = {}
      stateUpdateNew = { [dataNew.name]: [...dataNew.data, { ...action.payload.todo }] }
      let stateUpdateOld = { [dataOld.name]: dataOld.data.filter(element => element.id != action.payload.todo.id) }
      state = { ...state, ...stateUpdateNew, ...stateUpdateOld }
      try {
        localStorage.setItem("initialState", JSON.stringify(state));
      }
      catch (err) {
        console.log(err)
      };
      return {
        ...state
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
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

      return {
        ...state,
        todos: state.todos
      }

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }

    case UPDATE_TODO:
      let data = mappingData(action.payload.status.toLowerCase(), state)
      let dataUpdate = data.data.map(element => {
        if (element.id == action.payload.id) {
          return {
            ...element,
            content: action.payload.content
          }
        }
        else return element
      }
      )
      state = { ...state, [data.name]: dataUpdate }
      try {
        localStorage.setItem("initialState", JSON.stringify(state));
      }
      catch (err) {
        console.log(err)
      };
      return {
        ...state
      };

    case SET_TODO:
      state = { ...state, ...action.payload }
      return { ...state }

    case SET_DATA:
      state = { ...action.payload }
      return { ...state }

    default:
      return state;
  }
}

export default reducer;