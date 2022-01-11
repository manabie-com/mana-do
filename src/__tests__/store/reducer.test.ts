import { Dispatch, useReducer } from 'react';
import reducer, { AppState, initialState } from '../../store/reducer'
import { renderHook, act } from '@testing-library/react-hooks'
import {
    AppActions,
    createTodo,
    deleteAllTodos,
    deleteTodo,
    setTodos,
    toggleAllTodos,
    editTodo,
    updateTodoStatus
} from '../../store/actions';
import Service from '../../service';
import { Todo, TodoStatus } from '../../models/todo';

interface Store {
    current: [AppState, Dispatch<AppActions>],
}

describe('reducer', () => {
    let store: Store, dispatch: Dispatch<AppActions>, todo1 = 'Todo 1', todo2 = 'Todo 2', todo3 = 'Todo3'

    const state = (): AppState => {
        return store.current[0]
    }

    beforeEach(() => {
        const { result } = renderHook(() => useReducer(reducer, initialState));
        store = result
        dispatch = store.current[1]
    })

    test('should return the initial state', () => {
        expect(state()).toEqual(initialState)
    })

    test('should handle SET_TODO', async () => {
        act(() => {
            dispatch(setTodos([]))
        })
        expect(state().todos.length).toBe(0)
        const todos = await Promise.all([todo1, todo2, todo3].map(item => Service.createTodo(item)))
        act(() => {
            dispatch(setTodos(todos))
        })
        expect(state().todos.length).toBe(todos.length)
        expect(state().todos).toEqual(todos)
    })

    test('should handle CREATE_TODO', async () => {
        const resp1 = await Service.createTodo(todo1);
        act(() => {
            dispatch(createTodo(resp1))
        })
        expect(state().todos[0].content).toBe(todo1)
        const resp2 = await Service.createTodo(todo2);
        act(() => {
            dispatch(createTodo(resp2))
        })
        expect(state().todos.length).toBe(2)
        expect(state().todos[0].content).toBe(todo2)
    })

    test('should handle UPDATE_TODO_STATUS', async () => {
        const resp = await Service.createTodo(todo1);
        act(() => {
            dispatch(createTodo(resp))
        })
        expect(state().todos[0].status).toBe(TodoStatus.ACTIVE)
        act(() => {
            dispatch(updateTodoStatus(resp.id, true))
        })
        expect(state().todos[0].status).toBe(TodoStatus.COMPLETED)
    })

    test('should handle UPDATE_TODO_CONTENT', async () => {
        const resp = await Service.createTodo(todo1);
        act(() => {
            dispatch(createTodo(resp))
        })
        const updateTodo1 = 'Update Todo 1'
        act(() => {
            dispatch(editTodo(resp.id, updateTodo1))
        })
    })

    test('should handle TOGGLE_ALL_TODOS', async () => {
        const todos: Todo[] = await Promise.all([todo1, todo2, todo3].map(item => Service.createTodo(item)))
        act(() => {
            dispatch(setTodos(todos))
        })
        const activeTodos = state().todos.filter(({ status }) => status === TodoStatus.ACTIVE)
        expect(activeTodos.length).toBe(todos.length)
        act(() => {
            dispatch(toggleAllTodos(true))
        })
        const completedTodos = state().todos.filter(({ status }) => status === TodoStatus.COMPLETED)
        expect(completedTodos.length).toBe(todos.length)
    })

    test('should handle DELETE_TODO', async () => {
        const todos = await Promise.all([todo1, todo2, todo3].map(item => Service.createTodo(item)))
        act(() => {
            dispatch(setTodos(todos))
            dispatch(deleteTodo(todos[0].id))
        })
        expect(state().todos.length).toBe(todos.length - 1)
        expect(state().todos.findIndex(({ id }) => id === todos[0].id)).toBe(-1)
        act(() => {
            dispatch(deleteTodo(todos[1].id))
        })
        expect(state().todos.length).toBe(todos.length - 2)
        expect(state().todos.findIndex(({ id }) => id === todos[1].id)).toBe(-1)
    })

    test('should handle DELETE_ALL_TODOS', async () => {
        const todos = await Promise.all([todo1, todo2, todo3].map(item => Service.createTodo(item)))
        act(() => {
            dispatch(setTodos(todos))
            dispatch(deleteAllTodos())
        })
        expect(state().todos.length).toBe(0)
    })
})