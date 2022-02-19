import { unmountComponentAtNode } from "react-dom";
import { TodoStatus } from '../models/todo';
import { createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoContent, updateTodoStatus } from './actions';
import reducer, { initialState } from './reducer';


const item1 = {
  content: "No Content",
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: "1",
  user_id: "firstUser",
}
const item2= {
  content: "No Content 2",
  created_date: new Date().toISOString(),
  status: TodoStatus.COMPLETED,
  id: "2",
  user_id: "firstUser",
}

const activeItems = [item1]

const completedItems = [item2]

const data = [item1, item2];

const statusToggled = (status) => status === TodoStatus.COMPLETED ? TodoStatus.ACTIVE : TodoStatus.COMPLETED;
it("create todo",()=>{
  let action = createTodo(item1)
  let state = initialState;
  let newState = reducer(state,action)
  expect(newState).toEqual({todos: [item1]})
  expect(localStorage.getItem("todoState")).toBe(JSON.stringify(newState))
});

it("delete todo",()=>{
  let action = deleteTodo(item1.id)
  let state = {todos: data};
  let newState = reducer(state,action)
  expect(newState).toEqual({todos: [item2]})
  expect(localStorage.getItem("todoState")).toBe(JSON.stringify(newState))
});

it("update todo status",()=>{
  let action = updateTodoStatus(item1.id, true)
  let state = {todos: data};
  let newState = reducer(state,action)
  expect(newState).toEqual({todos: [{...item1, status: TodoStatus.COMPLETED}, item2]})
  expect(localStorage.getItem("todoState")).toBe(JSON.stringify(newState))
});

it("update todo content",()=>{
  let action = updateTodoContent(item2.id, "Hello")
  let state = {todos: data};
  let newState = reducer(state,action)
  expect(newState).toEqual({todos: [item1, {...item2, content: "Hello"}]})
  expect(localStorage.getItem("todoState")).toBe(JSON.stringify(newState))
});

it("toggle all todo",()=>{
  let action = toggleAllTodos(true)
  let state = {todos: data};
  let newState = reducer(state,action)
  expect(newState).toEqual({todos: [{...item1, status: TodoStatus.COMPLETED}, {...item2, status: TodoStatus.COMPLETED}]})
  expect(localStorage.getItem("todoState")).toBe(JSON.stringify(newState))
});

it("delete all todo",()=>{
  let action = deleteAllTodos()
  let state = {todos: data};
  let newState = reducer(state,action)
  expect(newState).toEqual({todos: []})
  expect(localStorage.getItem("todoState")).toBe(JSON.stringify(newState))
});
