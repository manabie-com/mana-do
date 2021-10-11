import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";

import ToolbarToDo from "components/ToDo/ToolbarToDo";
import userEvent from "@testing-library/user-event";
import { TodoStatus } from "models/todo";
import { EnhanceTodoStatus } from "pages/ToDoPage";
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
  onDeleteAllToDo: jest.fn(),
  onToggleAllToDo: jest.fn(),
};

let container: HTMLElement;

beforeEach(() => {
  container = render(<ToolbarToDo {...propsTest} />).container;
});

afterEach(cleanup);

test("ToolbarToDo: render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ToolbarToDo {...propsTest} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("ToolbarToDo: test btn clear all", () => {
  const btnClearAllEl = container.querySelector("button") as HTMLButtonElement;
  expect(btnClearAllEl).toHaveTextContent("Clear all");

  userEvent.click(btnClearAllEl);
  const modalEl = container.querySelector(".modal-custom") as HTMLButtonElement;
  expect(modalEl).toHaveClass("display-block");
});

test("ToolbarToDo: match snapshot", () => {
  const tree = renderer.create(<ToolbarToDo {...propsTest} />).toJSON();
  expect(tree).toMatchSnapshot();
});
