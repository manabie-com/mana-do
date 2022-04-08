import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import React from 'react'
import { CardProps, Todo, TodoStatus } from "../../../models/todo"
import { AppActions } from "../../../store/actions"
import Card from "../Card"

const fakeTodo: Todo = {
    id: 'id',
    content: 'content',
    status: TodoStatus.ACTIVE,
    created_date: Date.now().toString(),
    user_id: 'user_id'
}

const props: CardProps = {
    id: fakeTodo.id,
    status: fakeTodo.status,
    content: fakeTodo.content,
    showing: "ALL",
    onDeleteTodo: (id: string) => {},
    onUpdateTodoStatus: (status: boolean, todoId: string) => {},
    changeEditMode: function(todoId: string) {},
    currentEdit: '',
    dispatch: (value: AppActions) => {}
}

test('should render right content', () => {
    render(<Card {...props} />)

    const content = screen.getByText(/content/i);
    expect(content).toBeInTheDocument()
})

test('should render right status', () => {
    render(<Card {...props} />)

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement
    expect(checkbox.checked).toBe(false)
})

test('should content have right className', () => {
    const { container } = render(<Card {...props} />)
    const todoElement = container.firstChild as HTMLElement
    expect(todoElement.classList.contains('ACTIVE')).toBe(true)
})
