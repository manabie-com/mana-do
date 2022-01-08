import React from "react";
import { expect, test, describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import TodoList, { TodoListProps } from "../index";
import shortid from "shortid";
import { Todo, TodoStatus } from "models/todo";
import { createRenderer } from "react-test-renderer/shallow";

const mockedOnDelete = jest.fn();
const mockedOnUpdate = jest.fn();
const mockedOnUpdateStatus = jest.fn();

function renderTodosArray(
  todoContents: { content: string; status: TodoStatus }[]
): Todo[] {
  return todoContents.map((todo) => ({
    id: shortid(),
    user_id: "1",
    created_date: new Date().toISOString(),
    content: todo.content,
    status: todo.status,
  }));
}

describe("TodoList snapshot", () => {
  test("should render snapshot when todo list has no element", () => {
    const r = createRenderer();
    const props: TodoListProps = {
      list: [],
      onUpdateTodoStatus: mockedOnUpdateStatus,
      onDeleteTodo: mockedOnDelete,
      onUpdateTodo: mockedOnUpdate,
    };
    r.render(<TodoList {...props} />);
    expect(r.getRenderOutput()).toMatchSnapshot();
  });

  test("should render snapshot when todo list has 1 element", () => {
    const todos = renderTodosArray([
      { content: "Feed the dog", status: TodoStatus.ACTIVE },
    ]);
    const r = createRenderer();
    const props: TodoListProps = {
      list: todos,
      onUpdateTodoStatus: mockedOnUpdateStatus,
      onDeleteTodo: mockedOnDelete,
      onUpdateTodo: mockedOnUpdate,
    };
    r.render(<TodoList {...props} />);
    expect(r.getRenderOutput()).toMatchSnapshot();
  });
});

describe("TodoList functions", () => {
  test("should render 'You have nothing to do today.' sentence when todo list has no element.", () => {
    const props: TodoListProps = {
      list: [],
      onUpdateTodoStatus: mockedOnUpdateStatus,
      onDeleteTodo: mockedOnDelete,
      onUpdateTodo: mockedOnUpdate,
    };
    render(<TodoList {...props} />);
    const element = screen.getByText(
      "You have nothing to do today."
    ) as HTMLDivElement;
    expect(element).toBeDefined();
  });

  test("should render 1 element when todo list has 1 element.", () => {
    const todos = renderTodosArray([
      { content: "Feed the dog", status: TodoStatus.ACTIVE },
    ]);
    const props: TodoListProps = {
      list: todos,
      onUpdateTodoStatus: mockedOnUpdateStatus,
      onDeleteTodo: mockedOnDelete,
      onUpdateTodo: mockedOnUpdate,
    };
    render(<TodoList {...props} />);
    const elements = screen.getAllByTestId("todo-item");
    expect(elements.length).toBe(1);
  });
});
