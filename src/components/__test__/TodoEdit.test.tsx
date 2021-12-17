import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import TodoEdit from "../TodoEdit";

const mockedTodo = {
  id: "1",
  user_id: "1",
  content: "Shopping",
  created_date: "2021-12-17",
};

afterEach(cleanup);

describe("<Test TodoEdit/>", () => {
  it("should change to edit form when double click text", () => {
    render(<TodoEdit todo={mockedTodo} />);
    const paraElement = screen.getByTestId("todo-content");

    fireEvent.doubleClick(paraElement);
    const editElement = screen.getByTestId("todo-edit") as HTMLInputElement;
    expect(editElement).toBeInTheDocument();
  });

  it("should be able to type in input", () => {
    render(<TodoEdit todo={mockedTodo} />);
    const paraElement = screen.getByTestId("todo-content");
    fireEvent.doubleClick(paraElement);
    const editElement = screen.getByTestId("todo-edit") as HTMLInputElement;
    fireEvent.change(editElement, { target: { value: "Cooking" } });
    expect(editElement.value).toBe("Cooking");
  });
});
