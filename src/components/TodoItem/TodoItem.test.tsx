import React from 'react'
import { cleanup, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import TodoItem from ".";
import shortid from 'shortid';
import { TodoStatus } from '../../models/todo';
import { boolean } from 'yargs';

afterEach(cleanup)

const todo = {
    id: shortid(),
    user_id: "firstUser",
    content: "todo",
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
}

test("should change status to done when click", () => {
    let isCompleted: boolean = false
    const screen = render(
        <TodoItem
            todo={todo}
            onDeleteTodo={jest.fn()}
            onUpdateTodoContent={jest.fn()}
            onUpdateTodoStatus={e => {
                isCompleted = e.target.checked
            }}
        />,
    )
    let checkbox = screen.getByTestId(`${todo.id}`)
    userEvent.click(checkbox)
    expect(isCompleted).toEqual(true)

})

test("should be deleted when click delete", () => {
    let deleteId: string = ""
    const screen = render(
        
        <TodoItem
            todo={todo}
            onDeleteTodo={e => {
                deleteId = e
                console.log(deleteId)
            }}
            onUpdateTodoContent={jest.fn()}
            onUpdateTodoStatus={jest.fn()}
        />,
    )
    const deleteButton = screen.getByTestId(`${todo.id}-delete`)
    userEvent.click(deleteButton)
    expect(deleteId).toEqual(todo.id)
})

test("should be update to do content successfully", () => {
    let temp: string = ""
    const screen = render(
        <TodoItem
            todo={todo}
            onDeleteTodo={jest.fn()}
            onUpdateTodoContent={(id, content) => {
                temp = content
            }}
            onUpdateTodoStatus={jest.fn()}
        />,
    )
    let item = screen.getByText(todo.content)
    userEvent.dblClick(item)
    let input = screen.getByTestId('todo-content')
    userEvent.type(input, 'test')
    expect(input).toHaveValue(`${todo.content}test`)
    userEvent.keyboard('{enter}')
    expect(temp).toEqual(`${todo.content}test`)
})