import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActionButton } from "../ActionButton";
import { TodoStatus } from "../../../models/todo";

const onAction = jest.fn();

//IBtn object
const actionButton: IBtn = { title: "All", status: "ALL", onClick: onAction };
const clearButton: IBtn = {
  title: "Clear all todos",
  status: "None",
  onClick: onAction,
};
// render
const renderComponent = (props: IActionButton) => {
  const { actionBtn, statusCheck } = props;
  return render(
    <ActionButton actionBtn={actionBtn} statusCheck={statusCheck} />
  );
};

// test case
describe("<ActionButton/>", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent({
      actionBtn: actionButton,
      statusCheck: "All",
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should match snapshot-clearButton", () => {
    const wrapper = renderComponent({
      actionBtn: clearButton,
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render UI correctly", () => {
    renderComponent({
      actionBtn: actionButton,
      statusCheck: "ALL",
    });
    const title = screen.getByText("All");
    expect(title).toBeInTheDocument();
  });

  it("should be clickable correctly", () => {
    renderComponent({
      actionBtn: actionButton,
      statusCheck: "ALL",
    });
    const btn = screen.getByRole("button");
    expect(btn).not.toBeDisabled();
  });

  it("should be have current color on button when click correctly status", () => {
    renderComponent({
      actionBtn: actionButton,
      statusCheck: "ALL",
    });
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("Action__btn--checked");
  });
});
