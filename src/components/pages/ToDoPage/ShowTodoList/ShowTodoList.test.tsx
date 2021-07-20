import React from 'react'
import { render, screen } from '@testing-library/react'
import { Todo, TodoStatus } from '../../../../models/todo'
import ShowTodoList from './ShowTodoList'
import { setTodos } from '../../../../store/actions'
import reducer from '../../../../store/reducer'
import ToDoPage from '../ToDoPage/ToDoPage'
import userEvent from '@testing-library/user-event'

const dummyArray = {
    todos: [{
        content: 'ACTIVE1',
        status: TodoStatus.ACTIVE,
        id: 'id2',
        created_date: 'created_date',
        user_id: 'user_id'
    }, {
        content: 'COMPLETED1',
        status: TodoStatus.COMPLETED,
        id: 'id2',
        created_date: 'created_date',
        user_id: 'user_id'
    }, {
        content: 'ACTIVE2',
        status: TodoStatus.ACTIVE,
        id: 'id2',
        created_date: 'created_date',
        user_id: 'user_id'
    }
    ] as Todo[],
    todosEmpty: [] as Todo[]
}


describe('ShowTodoList', () => {
    it('should render to do list with no task', () => {
        render(<ShowTodoList todos={dummyArray.todosEmpty} />)
        expect(screen.getByText("You do not have any task today!")).toBeInTheDocument()
    })

    it('should render todolist with some tasks', () => {
        render(<ShowTodoList todos={dummyArray.todos} />)

        expect(screen.getByDisplayValue('ACTIVE1')).toBeInTheDocument()
        expect(screen.getByDisplayValue('ACTIVE2')).toBeInTheDocument()
        expect(screen.getByDisplayValue('COMPLETED1')).toBeInTheDocument()
    })

    it('should render active tasks when user click active button', () => {
        reducer(dummyArray, setTodos(dummyArray.todos))
        render(<ToDoPage/>)
        const activeBtn = screen.getByTestId('btn-Active')
        userEvent.click(activeBtn)

        expect(screen.getByDisplayValue('ACTIVE1')).toBeInTheDocument()
        expect(screen.getByDisplayValue('ACTIVE2')).toBeInTheDocument()
        expect(screen.queryByText('COMPLETED1')).not.toBeInTheDocument()
    })

    it('should render completed tasks when user click completed button', () => {
        reducer(dummyArray, setTodos(dummyArray.todos))
        render(<ToDoPage/>)
        const completedBtn = screen.getByTestId('btn-Completed')
        userEvent.click(completedBtn)

        expect(screen.queryByText('ACTIVE1')).not.toBeInTheDocument()
        expect(screen.queryByText('ACTIVE2')).not.toBeInTheDocument()
        expect(screen.getByDisplayValue('COMPLETED1')).toBeInTheDocument()
    })

})