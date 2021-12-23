import { screen, render, within } from "@testing-library/react"
import { TodoContext } from "../../contexts/TodoContext";

import {TodoState} from '../../../store/reducer'
import TodoList from "../TodoList";
import { TodoStatus } from "../../../models/todo";

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


test("Should correctly render", () => {
    
    render(
      <TodoContext.Provider value={contextValues}>
        <TodoList />
      </TodoContext.Provider>
    );

    expect(screen.getAllByTestId('todo-list')).toBeTruthy()

 

  });

it("should render list of 2 todos", () => {
    todoList.todos = [
        {
            id: '1',
            user_id: 'user 1',
            content : 'content 1',
            status: TodoStatus.ACTIVE,
            created_date: '2021-12-7'
        },
        {
            id: '2',
            user_id: 'user 2',
            content : 'content 2',
            status: TodoStatus.ACTIVE,
            created_date: '2021-12-7'
        }
    ]

    render(
      <TodoContext.Provider value={contextValues}>
        <TodoList />
      </TodoContext.Provider>
    );

    const todoItems = screen.getAllByTestId('todo-item-content').map(item => item.textContent)
    expect(todoItems.length).toBe(2)
    expect(todoItems[0]).toEqual(todoList.todos[0].content)
  })