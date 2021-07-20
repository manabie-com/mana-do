import React, { useReducer } from 'react';
import { render, screen } from '@testing-library/react'
import TodoItem from './TodoItem';
import { Todo, TodoStatus } from '../../../../models/todo';
import reducer, { initialState } from '../../../../store/reducer';

const todo = [{
    content: 'content',
    status: TodoStatus.ACTIVE,
    id: 'id',
    created_date: 'created_datets',
    user_id: 'user_id'
} as Todo] as Todo[]

describe('TodoItem', () => {
    it('should render to do item', () => {
        const { result } = renderHook(() => useReducer(reducer, initialState));
        const [state, dispatch] = result.current;
        render(<TodoItem todo={todo[0]} dispatch={dispatch} todosLength={todo.length} />)
        expect(screen.getByDisplayValue('content')).toBeInTheDocument()
        expect(screen.getByTestId('ToDo__item-delete')).toBeInTheDocument()
    })
})