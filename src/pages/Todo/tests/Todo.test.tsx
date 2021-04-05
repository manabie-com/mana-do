import React from "react";
import { render } from "@testing-library/react";

import Todo from "../index";

const renderComponent = () => {
  const utils = render(<Todo />);

  const todo = utils.container;
  return { ...utils, todo };
};

describe("<Todo />", () => {
  it("should render header", () => {
    const { todo } = renderComponent();
    expect(todo.getElementsByClassName("todo__header")).toHaveLength(1);
  });

  it("should render creation", () => {
    const { todo } = renderComponent();
    expect(todo.getElementsByClassName("todo__creation")).toHaveLength(1);
  });
  
  it("should render list", () => {
    const { todo } = renderComponent();
    expect(todo.getElementsByClassName("todo__list")).toHaveLength(1);
  });

  it("should render toolbar", () => {
    const { todo } = renderComponent();
    expect(todo.getElementsByClassName("todo__toolbar")).toHaveLength(1);
  });
});
