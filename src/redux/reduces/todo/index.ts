import { Draft } from '@reduxjs/toolkit';
import initialState from '../../state/todo/index';
import { TodoStatus } from "../../../models/todo";
const reduces = {
    setTodos: (
        state: Draft<typeof initialState>,
        action: any
    ) => {
        state.todos = action.payload.todos;
    },
    resetTodos: (state: Draft<typeof initialState>) => {
        state.todos = []
    },
    addTodo: (state: Draft<typeof initialState>,  action: any) => {
        const todos = [action.payload.todo, ...state.todos ];
        localStorage.setItem('todos', JSON.stringify(todos));
        return {
          ...state,
          todos: todos
        };
    }, 
    editTodoStatus: (state: Draft<typeof initialState>,  action: any) => {
        let index = state.todos.findIndex(x => x.id === action.payload.id);
        state.todos[index].status = action.payload.status;
        localStorage.setItem('todos', JSON.stringify(state.todos));
        return state;
    }, 
    editTodo: (state: Draft<typeof initialState>,  action: any) => {
        let index = state.todos.findIndex(x => x.id === action.payload.id);
        state.todos[index].content = action.payload.content;
        localStorage.setItem('todos', JSON.stringify(state.todos));
        return state;
    }, 

    toggleAllTodo: (state: Draft<typeof initialState>,  action: any) => {
        let status: TodoStatus =  action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        state.todos.map(x => x.status = status);
        localStorage.setItem('todos', JSON.stringify(state.todos));
        return state;
    }, 
    deleteTodo: (state: Draft<typeof initialState>,  action: any) => {
        state.todos = state.todos.filter(x => x.id !== action.payload.id);
        localStorage.setItem('todos', JSON.stringify(state.todos));
        return state;
    }, 
    deleteAll: (state: Draft<typeof initialState>) => {
        state.todos = [];
        localStorage.setItem('todos', JSON.stringify(state.todos));
        return state;
    }, 
}

export default reduces;