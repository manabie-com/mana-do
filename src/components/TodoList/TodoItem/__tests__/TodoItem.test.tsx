import React from "react";
import { mount, ReactWrapper } from "enzyme";

import { findByTestAttr } from "test/testUtils";
import TodoItem, { ITodoItemProps } from "..";
import { TodoStatus } from "models/todo";

const setUp = (props: ITodoItemProps): ReactWrapper => {
 const wrapper = mount(<TodoItem {...props} />)
 return wrapper;
}

describe("<TodoItem /> rendering", () => {
  let wrapper: ReactWrapper;
  const props = {
    onDeleteTodo: jest.fn(),
    onUpdateTodoStatus: jest.fn(),
    id: "id_1",
    user_id: "test",
    content : "test",
    status: TodoStatus.COMPLETED,
    created_date: "test",
  }
  
  beforeEach(() => {
    wrapper = setUp(props);
  });
  test("render Todo Item without errors", () => {
    const todoItem = findByTestAttr(wrapper, "todo-item");
    expect(todoItem.length).toBe(1);
  })
  test("render Todo Content without errors", () => {
    const todoContent = findByTestAttr(wrapper, "content");
    expect(todoContent.length).toBe(1);
  })
  test("render Delete Button without errors", () => {
    const deleteButton = findByTestAttr(wrapper, "delete-button");
    expect(deleteButton.length).toBe(1);
  })
  test("render correct style if todo item status is `COMPLETED`", () => {
    const todoContent = findByTestAttr(wrapper, "content");
    const expectedClassName = "content active";
    expect(todoContent.prop("className")).toBe(expectedClassName);
  })
})
describe("<TodoItem /> interactions", () => {
  let wrapper: ReactWrapper;
  const props = {
    onDeleteTodo: jest.fn(),
    onUpdateTodoStatus: jest.fn(),
    id: "id_1",
    user_id: "test",
    content : "test",
    created_date: new Date().toISOString(),
  }
  
  beforeEach(() => {
    wrapper = setUp(props);
  });
  test("triggers onDeleteTodo function when clicked delete button", () => {
    const deleteButton = findByTestAttr(wrapper, "delete-button");
    deleteButton.simulate("click");
    expect(props.onDeleteTodo).toHaveBeenCalledWith(props.id)
  })
  test("triggers onUpdateTodoStatus function when clicked checkbox", () => {
    const checkboxInput = findByTestAttr(wrapper, "checkbox-input");
    checkboxInput.simulate("change", { e: { target: { checked: false }}});
    expect(props.onUpdateTodoStatus).toHaveBeenCalledWith(props.id, false)
  })
})