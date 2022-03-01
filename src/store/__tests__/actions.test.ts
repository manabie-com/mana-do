import { createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoStatus } from "./actions";


test("test setTodos", () => {
    expect(setTodos([])).toMatchObject({type: 'SET_TODO'})
    expect(setTodos([])).toHaveProperty('payload')
})

test("test createTodo", () => {
    expect(createTodo({})).toMatchObject({type: 'CREATE_TODO'})
    expect(createTodo({})).toHaveProperty('payload')
})

test("test updateTodoStatus", () => {
    expect(updateTodoStatus('', true)).toMatchObject({type: 'UPDATE_TODO_STATUS'})
    expect(updateTodoStatus('', true)).toHaveProperty('payload')
})

test("test deleteTodo", () => {
    expect(deleteTodo('')).toMatchObject({type: 'DELETE_TODO'})
    expect(deleteTodo('')).toHaveProperty('payload')
})

test("test deleteAllTodos", () => {
    expect(deleteAllTodos()).toMatchObject({type: 'DELETE_ALL_TODOS'})
})

test("test toggleAllTodos", () => {
    expect(toggleAllTodos(true)).toMatchObject({type: 'TOGGLE_ALL_TODOS'})
    expect(toggleAllTodos(true)).toHaveProperty('payload')
})