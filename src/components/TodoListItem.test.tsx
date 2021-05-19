import React from "react";
import {
  render,
  cleanup,
} from "@testing-library/react";
import TodoListItem from "./TodoListItem";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import userEvent from "@testing-library/user-event";

let defaultProps = {
  dataSource: {
    content: "data-test=[Testing text]",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: "firstUser",
  } as Todo,
  onDelete: () => {},
  onUpdate: ({ key, name, value }: any) => {
      defaultProps.dataSource[name] = value;
  },
};

afterEach(cleanup);
const setup = (props: any) => {
  return render(<TodoListItem {...props} />);
};
describe("Test render `TodoListItem`", () => {
  test("renders content of item is `data-test=[Testing text]` when prop dataSource.content is `data-test=[Testing text]`", () => {
    const { getByText } = setup(defaultProps);
    const contentElement = getByText(defaultProps.dataSource.content);
    expect(contentElement).toBeInTheDocument();
  });
  test("renders input checkbox uncheck when prop dataSource.status is `ACTIVE`", () => {
    const { container } = setup(defaultProps);
    const elements = container.getElementsByClassName("item__status");
    if (elements && elements.length > 0) {
      const checkbox = elements[0];
      expect(checkbox.hasAttribute("checked")).toEqual(false);
    }
    expect(elements.length).toEqual(1);
  });
  test("renders input checkbox checked when prop dataSource.status is `COMPLETED`", () => {
    defaultProps.dataSource.status = TodoStatus.COMPLETED;
    const { container } = setup(defaultProps);
    const elements = container.getElementsByClassName("item__status");
    if (elements && elements.length > 0) {
      const checkbox = elements[0];
      expect(checkbox.hasAttribute("checked")).toEqual(true);
    }
    expect(elements.length).toEqual(1);
  });
  test("renders input with value `data-test=[Testing text]` when double click in text content", () => {
    const { container } = setup(defaultProps);
    const elements = container.getElementsByClassName("item__content");
    if (elements && elements.length > 0) {
      const contentElement = elements[0];
      if (contentElement != null) {
        userEvent.dblClick(contentElement);
        const contentEdit = container.getElementsByClassName("content--edit");
        expect(contentEdit.length).toEqual(1);
        expect(contentEdit[0].getAttribute("value")).toEqual(
          defaultProps.dataSource.content
        );
      }
    }
    expect(elements.length).toEqual(1);
  });
  test("renders input checked (status `COMPLETED`) when click in uncheck checkbox(item with status `ACTIVE`)", () => {
    defaultProps.dataSource.status = TodoStatus.ACTIVE;
    const { container } = setup(defaultProps);
    let elements = container.getElementsByClassName("item__status");
    if (elements && elements.length > 0) {
      let checkbox = elements[0] as HTMLInputElement;
      userEvent.click(checkbox);
      const { container } = setup(defaultProps);
      elements = container.getElementsByClassName("item__status");
      expect((elements[0] as HTMLInputElement).checked).toEqual(true);
    }
    expect(elements.length).toEqual(1);
  });
  test("renders input un-checked (status `ACTIVE`) when click in checked checkbox(item with status `COMPLETED`)", () => {
    defaultProps.dataSource.status = TodoStatus.COMPLETED;
    const { container } = setup(defaultProps);
    let elements = container.getElementsByClassName("item__status");
    if (elements && elements.length > 0) {
      let checkbox = elements[0] as HTMLInputElement;
      userEvent.click(checkbox);
      const { container } = setup(defaultProps);
      elements = container.getElementsByClassName("item__status");
      expect((elements[0] as HTMLInputElement).checked).toEqual(false);
    }
    expect(elements.length).toEqual(1);
  });
});
