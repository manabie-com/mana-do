import React from "react"
import { cleanup, render } from "@testing-library/react"
import TodoList from "."
import shortid from "shortid"
import { TodoStatus } from "../../models/todo"

const todos = [
    {
        id: shortid(),
        user_id: "firstUser",
        content: "todo",
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
    },
    {
        id: shortid(),
        user_id: "firstUser",
        content: "todo 2",
        status: TodoStatus.COMPLETED,
        created_date: new Date().toISOString(),
    },
]


test('should render todo list', () => {
    const screen = render(
        <TodoList
            todos={todos}
            onDeleteTodo={jest.fn()}
            onUpdateTodoContent={jest.fn()}
            onUpdateTodoStatus={jest.fn()}
        />,
    )
    
    todos.forEach(t => {
        expect(screen.getByText(t.content)).toBeInTheDocument()
    })
})
