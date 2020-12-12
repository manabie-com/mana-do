import { Todo, TodoStatus } from '../models/todo';
import {
    createTodo,
    updateTodoStatus,
    toggleAllTodos,
    deleteTodo,
    deleteAllTodos,
    updateTodo,
    setTodos
} from './actions'

import shortid from 'shortid'

import reducer from './reducer';

const initialState = {
    todos: []
}
const sampleData = {
    content: "meo meo",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'firstUser'
}

const sampleTodos = [
    {
        content: "buy a door",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: 'firstUser'
    },
    {
        content: "build an app",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: 'firstUser'
    }
]

describe('reducer', () => {
    it('should create a new task', () => {
        const newTask = sampleData;

        const { todos } = reducer(initialState, createTodo(newTask))

        expect(Array.isArray(todos)).toBe(true);
        expect(todos).toEqual(expect.arrayContaining([
            expect.objectContaining(newTask)
        ]))
    })

    it('should set todo list', () => {
        const todoList = sampleTodos;
        const { todos } = reducer(initialState, setTodos(todoList))
        expect(Array.isArray(todos)).toBe(true);

        expect(todos).toEqual(expect.arrayContaining([
            expect.objectContaining(todoList[0])
        ]))

        expect(todos).toEqual(expect.arrayContaining([
            expect.objectContaining(todoList[1])
        ]))

        expect(todos).toHaveLength(2)
    })

    it('should update todo status', () => {
        const newTask = sampleData;

        const { todos } = reducer({ todos: [] }, createTodo(newTask))

        reducer({ todos }, updateTodoStatus(newTask.id, true));

        const index = todos.findIndex(todo => todo.id === newTask.id);

        expect(Array.isArray(todos)).toBe(true);

        expect(todos).toEqual(expect.arrayContaining([
            expect.objectContaining(newTask)
        ]))

        expect(todos[index].status).toEqual('COMPLETED')
    })

    it('should update todo content', () => {
        const newTask = sampleData;
        const content = "grow some trees";

        const { todos } = reducer({ todos: [] }, createTodo(newTask));
        const index = todos.findIndex(todo => todo.id === newTask.id);

        reducer({ todos }, updateTodo(newTask.id, content));

        expect(Array.isArray(todos)).toBe(true);
        expect(todos[index].content).toEqual(content)
    })

    it('should delete a todo', () => {
        const newTask = sampleData;

        const { todos } = reducer({ todos: [] }, createTodo(newTask))

        reducer({ todos }, deleteTodo(newTask.id));

        expect(todos).toHaveLength(0);
        expect(todos).not.toEqual(expect.arrayContaining([
            expect.objectContaining(newTask)
        ]))
    })

    it('should delete all todo list', () => {
        const todoList = sampleTodos;
        const { todos } = reducer({ todos: todoList }, deleteAllTodos());

        expect(todos).toHaveLength(0);
    })

    it('should toggle all todo status to COMPLETED', () => {
        const { todos } = reducer({ todos: sampleTodos }, toggleAllTodos(true));

        const result = todos.every(todo => todo.status === 'COMPLETED');

        expect(Array.isArray(todos)).toBe(true);
        expect(result).toBe(true)
    })

    it('should toggle all todo status to ACTIVE', () => {
        const { todos } = reducer({ todos: sampleTodos }, toggleAllTodos(false));

        const result1 = todos.every(todo => todo.status === 'COMPLETED');
        const result2 = todos.every(todo => todo.status === 'ACTIVE');

        expect(Array.isArray(todos)).toBe(true);
        expect(result1).toBe(false);
        expect(result2).toBe(true);
    })
})
