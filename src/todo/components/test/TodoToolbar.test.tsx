import { screen, render, within } from "@testing-library/react"
import { TodoStatus } from "../../../models/todo";
import { TodoState } from "../../../store/reducer";
import { TodoContext } from "../../contexts/TodoContext";
import { TodoToolbar } from "../TodoToolbar";

let todoList: TodoState = {
    todos: []
}
let contextValues = {
    todoList,
    showingStatus: 'ALL',
    onUpdateTodoStatus: jest.fn,
    onDeleteTodo: jest.fn,
    onCreateTodo: jest.fn,
    onSetShowingTodo: jest.fn,
    onToggleAllTodos: jest.fn,
    onDeleteAllTodos: jest.fn
}

it("should render 4 buttons and 1 checked", () => {
    todoList.todos = [
        {
            id: '1',
            user_id: 'user 1',
            content : 'content 1',
            status: TodoStatus.COMPLETED,
            created_date: '2021-12-7'
        },
        {
            id: '2',
            user_id: 'user 2',
            content : 'content 2',
            status: TodoStatus.COMPLETED,
            created_date: '2021-12-7'
        }
    ]

    render(
      <TodoContext.Provider value={contextValues}>
        <TodoToolbar />
      </TodoContext.Provider>
    );

    const buttons = screen.getAllByTestId('button').map(item => item.textContent)
    expect(buttons.length).toBe(4)

    const checked = screen.getAllByTestId('checkbox').map(item => item.title)
    expect(checked.length).toBe(1)
    
  })