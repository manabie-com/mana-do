import shortid from 'shortid';

import reducer from './reducer';
import { setTodos, createTodo, updateTodo, deleteTodo, deleteAllTodos } from './actions'
import { Todo, TodoStatus } from '../models/todo';

const emptyState = { todos: [] }

const initialState: Array<Todo> = [
    {
        content: 'Eat',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: 'firstUser',
    },
    {
        content: 'Sleep',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: 'firstUser',
    },
    {
        content: 'Repeat',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: 'firstUser',
    },
];

const todo: Todo = {
    content: 'Content',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'firstUser',
};

test('should return the initial state', () => {
    expect(reducer(emptyState, setTodos(initialState))).toEqual({ todos: initialState });
})

test('should handle a todo being added to an empty list', () => {
    expect(reducer(emptyState, createTodo(todo))).toEqual({ todos: [{ ...todo }] });
})

test('should handle a todo being added to an existing list', () => {
    expect(reducer({ todos: initialState }, createTodo(todo))).toEqual({ todos: [...initialState, { ...todo }] })
})

test('should handle a todo being marked as completed', () => {
    const updatedTodo = { ...todo, status: TodoStatus.COMPLETED };
    expect(reducer({ todos: [...initialState, { ...todo }] }, updateTodo(updatedTodo))).toEqual({ todos: [...initialState, { ...updatedTodo }] })
})

test('should handle a todo being removed from the list', () => {
    expect(reducer({ todos: [...initialState, { ...todo }] }, deleteTodo(todo.id))).toEqual({ todos: initialState })
})

test('should return an empty state when deleting all todos', () => {
    expect(reducer({ todos: initialState }, deleteAllTodos())).toEqual(emptyState);
})
