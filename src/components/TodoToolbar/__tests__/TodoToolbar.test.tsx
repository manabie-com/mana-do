import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr } from "test/testUtils";
import TodoToolbar, { ITodoToolbarProps } from "..";
import { tabsList } from "../constants";
import { deleteAllTodos } from "store/action-creators";

const setUp = (props: ITodoToolbarProps): ShallowWrapper => {
 const wrapper = shallow(<TodoToolbar {...props} />)
 return wrapper;
}

describe("<TodoToolbar /> redering", () => {
  let wrapper: ShallowWrapper;
  const props = {
    onTabClick: jest.fn(),
    dispatch: jest.fn(),
    active: "ALL",
    activeTodos: 4
  }
  beforeEach(() => {
    wrapper = setUp(props);
  })
  test("renders Todo Toolbar without erros", () => {
    const todoToolbar = findByTestAttr(wrapper, "todo-toolbar");
    expect(todoToolbar.length).toBe(1)
  })
  test("renders correct Count Active Todos", () => {
    const countActiveTodos = findByTestAttr(wrapper, "count-active-todos");
    const expectedString = `${props.activeTodos} items left`;
    expect(countActiveTodos.text()).toBe(expectedString)
  })
  test("renders Tab List without erros", () => {
    const tabList = findByTestAttr(wrapper, "tab-list");
    expect(tabList.length).toBe(1)
  })
  test("render correct Tab Item length", () => {
    const tabList = findByTestAttr(wrapper, "tab-list");
    expect(tabList.children().length).toBe(tabsList.length)
  })
  test("render correct style of Tab Item when actived", () => {
    const tabItem = findByTestAttr(wrapper, `tab-item-${props.active}`);
    const expectedClassName = "tabItem active";
    expect(tabItem.prop("className")).toBe(expectedClassName)
  })
  test("renders Clear All Button without erros", () => {
    const clearAllButton = findByTestAttr(wrapper, "clear-all-button");
    expect(clearAllButton.length).toBe(1)
  })
})
describe("<TodoToolbar /> interactions", () => {
  let wrapper: ShallowWrapper;
  const props = {
    onTabClick: jest.fn(),
    dispatch: jest.fn(),
    active: "ALL",
    activeTodos: 4
  }
  beforeEach(() => {
    wrapper = setUp(props);
  })
  test("call onTabClick function with tab's value when clicked Tab Item", () => {
    const tabValue = tabsList[2].value;
    const tabItem = findByTestAttr(wrapper, `tab-item-${tabValue}`);
    tabItem.simulate("click");
    expect(props.onTabClick).toHaveBeenCalledWith(tabValue)
  })
  test("call onClearAll function when clicked Clear All Button", () => {
    const clearAllButton = findByTestAttr(wrapper, "clear-all-button");
    clearAllButton.simulate("click");
    expect(props.dispatch).toHaveBeenCalledWith(deleteAllTodos());
  })
})