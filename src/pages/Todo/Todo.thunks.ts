import Service from "service"
import * as actions from "./Todo.actions"
import { TodoStatus } from 'models/todo';

export const getTodoList = () => dispatch => {
  dispatch(actions.getTodoList())
  return Service.getTodoList()
    .then((res: any) => {
      return dispatch(actions.setTodoList(res || []));
    })
  .catch((err: any) => {
      return Promise.reject(err);
    })
}

export const createTodo = (payload) => dispatch => {
  dispatch(actions.createTodo(payload))
  return Service.createTodo(payload)
    .then((res: any) => {
      let todoList: any = localStorage.getItem("todoList") || "[]"; 
      todoList = JSON.parse(todoList);
      todoList.unshift(res);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      return dispatch(getTodoList());
    })
   .catch((err: any) => {
      return Promise.reject(err);
    })
}

export const updateTodo = (payload) => dispatch => {
  const { field, value, id } = payload;
  dispatch(actions.updateTodo(field, value, id))
  return Service.updateTodo(field, value, id)
    .then((res: any) => {
      switch (field) {
        case "content":
        dispatch(actions.updateTodoContent(id, value))
            break;
        case "status":
            dispatch(actions.updateTodoStatus(id, value === TodoStatus.COMPLETED))
            break;
        default:
          break;
      }
      return dispatch(getTodoList());
    })
   .catch((err: any) => {
      return Promise.reject(err);
    })
}

export const updateAllTodo = (status: any, fnCallback?: any) => dispatch => {
  dispatch(actions.updateAllTodo(status))
  return Service.updateAllTodo(status)
    .then((res: any) => {
     
      fnCallback?.()
      return dispatch(actions.toggleAllTodos(status));
    })
   .catch((err: any) => {
      return Promise.reject(err);
    })
}
export const deleteAllTodo = () => dispatch => {
  dispatch(actions.deleteAllTodoList())
  return Service.deleteAllTodo()
    .then((res: any) => {
      return dispatch(actions.setTodoList([]));
    })
   .catch((err: any) => {
      return Promise.reject(err);
    })
}

export const deleteTodo = (id: string) => dispatch => {
  dispatch(actions.deleteTodo(id))
  return Service.deleteTodo(id)
    .then((res: any) => {
      return dispatch(actions.setTodoList(res || []));
    })
    .catch((err: any) => {
      return Promise.reject(err);
    })
}

const TodoThunk = {
  createTodo,
  getTodoList,
  updateTodo,
  updateAllTodo,
  deleteAllTodo,
  deleteTodo
}

export default TodoThunk;