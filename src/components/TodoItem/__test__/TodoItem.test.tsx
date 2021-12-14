import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { TodoItem } from "../TodoItem";

type RenderComponentTypes = Pick<ITodoItem, "id" | "idClick">;

const onUpdate = jest.fn();
const onDelete = jest.fn();

const renderComponent = (props: RenderComponentTypes) => {
  const { id, idClick } = props;
  return render(
    <TodoItem
      id={id}
      idClick={idClick}
      handleEditTodos={onUpdate}
      content="OK"
      checked={false}
      onChange={jest.fn()}
      onClick={onDelete}
    />
  );
};

describe("<TodoItem/> edit", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent({ id: "1", idClick: "1" });
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render UI correctly", () => {
    renderComponent({ id: "1", idClick: "1" });
    const input = screen.getByTestId("TodoItem_input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("OK");
  });

  it("should be able to type in input", () => {
    renderComponent({ id: "1", idClick: "1" });
    const input = screen.getByTestId("TodoItem_input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Reading some books" } });
    expect(input.value).toBe("Reading some books");
  });
});

describe("<TodoItem/>", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent({ id: "1", idClick: "2" });
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should check the checkbox Element is hidden", () => {
    renderComponent({ id: "1", idClick: "2" });
    const checkbox = screen.getByTestId(
      "TodoItem_checkbox"
    ) as HTMLInputElement;
    expect(checkbox).toHaveStyle(`display: none;`);
  });

  it("should call del func", () => {
    renderComponent({ id: "1", idClick: "2" });

    const btn = screen.getByTestId("TodoItem_btnDel");
    userEvent.click(btn);
    expect(onDelete).toBeCalledTimes(1);
  });
});
