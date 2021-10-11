import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";

import ToDoList from "components/ToDo/ListToDo";
import { TodoStatus } from "models/todo";
import { EnhanceTodoStatus } from "pages/ToDoPage";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

const propsTest = {
  todos: [
    {
      id: "todo",
      user_id: "user_id",
      content: "content",
      status: TodoStatus.ACTIVE,
      created_date: new Date().toISOString(),
    },
  ],
  onFilter: (status: EnhanceTodoStatus) => null,
  showing: TodoStatus.ACTIVE,
  onUpdateTodoStatus: (id: string, checked: boolean) => null,
  onDeleteTodo: (id: string) => null,
};

let container: HTMLElement;

beforeEach(() => {
  container = render(<ToDoList {...propsTest} />).container;
});

afterEach(cleanup);

test("List todo: render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ToDoList {...propsTest} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("List todo: click update todo item", () => {
  const todoItemEl = container.querySelector(".ToDo__item0") as HTMLDivElement;
  const buttonEl = todoItemEl.querySelector("button") as HTMLButtonElement;
  expect(todoItemEl).toHaveTextContent("content");
  userEvent.click(buttonEl);
});

test("List todo: match snapshot", () => {
  const tree = renderer.create(<ToDoList {...propsTest} />).toJSON();
  expect(tree).toMatchSnapshot();
});
