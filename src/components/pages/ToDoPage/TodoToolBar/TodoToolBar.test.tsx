import React from 'react'
import { render, screen } from '@testing-library/react'
import TodoToolBar from './TodoToolBar'
import { Todo, TodoStatus } from '../../../../models/todo'

const dummyArray = {
    todos: [{
        content: 'content2',
        status: TodoStatus.ACTIVE,
        id: 'id2',
        created_date: 'created_date',
        user_id: 'user_id'
    } as Todo
    ] as Todo[],
    todosEmpty: [] as Todo[]
}



describe('TodoToolBar', () => {
    it('should render todo tool bar without checkboxAll', () => {
        render(<TodoToolBar todos={dummyArray.todosEmpty}/>)

        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.queryByTestId('Todo__toolbar-checkbox')).not.toBeInTheDocument();
    })

    it('should render todo tool bar with checkboxAll', () => {
        render(<TodoToolBar todos={dummyArray.todos} />)

        expect(screen.getByTestId('Todo__toolbar-checkbox')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();

    })
})