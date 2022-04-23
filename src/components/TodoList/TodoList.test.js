import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import TodoList from "./TodoList";

const fakeTodo = [
  {
    id: 1,
    content: "Feed the cat",
    completed: false,
  },
  {
    id: 2,
    content: "Feed the cat 2",
    completed: false,
  },
  {
    id: 3,
    content: "Feed the cat 3",
    completed: false,
  },
];

describe("TodoList", () => {
  it("should render TodoList with empty todo", () => {
    render(<TodoList todo={[]} />);
    expect(screen.queryByTestId("todo-list")).toBeInTheDocument();
  });

  it("should render TodoList with array todo", () => {
    const list = render(<TodoList todo={fakeTodo} />);
    expect(list.queryByTestId("todo-list")).toBeInTheDocument();
    expect(list.getByText("Feed the cat")).toBeTruthy();
    expect(list.getByText("Feed the cat 3")).toBeTruthy();
  });
});
