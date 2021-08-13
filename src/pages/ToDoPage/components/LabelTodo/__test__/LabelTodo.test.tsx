import { fireEvent, render, screen } from "@testing-library/react";
import { LabelTodo } from "../LabelTodo";
import userEvent from "@testing-library/user-event";
import shortid from "shortid";

import { TodoStatus } from "../../../../../constants/todo";

const mockTodo = [
  {
    content: "TEST",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: "firstUser",
  },
  {
    content: "TEST",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: "firstUser",
  },
];

describe("LabelTodo", () => {
  it("Should render title", () => {
    render(<LabelTodo title="Title test" />);
    expect(screen.getByText("Title test")).toBeInTheDocument();
  });

  it("Should render checkbox", () => {
    render(<LabelTodo title="Title test" hasCheckAll todos={mockTodo} />);
    expect(screen.getByTestId("label-todo-checked")).toBeInTheDocument();
  });

  it("Should render title", () => {
    const onChange = jest.fn();

    render(
      <LabelTodo
        title="Title test"
        onChange={onChange}
        hasCheckAll
        todos={mockTodo}
      />
    );
    const checked = screen.getByTestId("label-todo-checked");
    userEvent.click(checked);
    expect(onChange).toBeCalled();
  });
});
