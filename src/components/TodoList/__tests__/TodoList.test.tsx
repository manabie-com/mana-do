import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr } from "test/testUtils";
import TodoList, { ITodoListProps } from "..";

const setUp = (props: ITodoListProps): ShallowWrapper => {
 const wrapper = shallow(<TodoList {...props} />)
 return wrapper;
}

describe("<TodoList /> rendering", () => {
  let wrapper: ShallowWrapper;
  const expectedItems = [
    { 
      id: "id_1",
      user_id: "test",
      content : "test",
      created_date: new Date().toISOString(),
    },
    { 
      id: "id_2",
      user_id: "test",
      content : "test",
      created_date: new Date().toISOString(),
    },
  ]
  const props = {
    onDeleteTodo: jest.fn(),
    onUpdateTodoStatus: jest.fn(),
    onUpdateTodoContent: jest.fn(),
    items: expectedItems
  }
  beforeEach(() => {
    wrapper = setUp(props);
  })
  test("render TodoList without errors", () => {
    const todoList = findByTestAttr(wrapper, "todo-list");
    expect(todoList.length).toBe(1)
  })
  test("render correct items length", () => {
    const todoList = findByTestAttr(wrapper, "todo-list");
    expect(todoList.children().length).toBe(expectedItems.length);
  })
})