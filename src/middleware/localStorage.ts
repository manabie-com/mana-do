import { Todo } from "../models/todo"

export const setToLocalStorage=(todos:Todo[])=>{
  window.localStorage.setItem('list-todo',JSON.stringify(todos));
}

export const getFromLocalStorage=()=>{
  return JSON.parse(window.localStorage.getItem('list-todo')|| '[]');
}