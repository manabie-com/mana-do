import React, { FC, ReactElement } from "react";
import { configure, mount } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { TodoItemProps, TodoStatus } from "../../models/todo";
import TodoItem from "./TodoItem";

configure({ adapter: new Adapter() });

const props: TodoItemProps = {
  todo: {
    content: "1",
    created_date: "2022-04-18T18:18:55.975Z",
    id: "28o6yJPWc3",
    status: TodoStatus.ACTIVE,
    user_id: "firstUser",
  },
  dispatch: jest.fn(),
};

describe("TodoItem", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(<TodoItem todo={props.todo} dispatch={props.dispatch} />);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it("Should renders TodoItem correctly", () => {
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should call edit item", () => {
    wrapper
      .find({ className: "Todo__item_input--default" })
      .simulate("doubleClick");
    expect(
      wrapper.find({ className: "Todo__item_input--modify" })
    ).toBeTruthy();
    expect(
      wrapper.find({ className: "Todo__item_input--fullwidth" })
    ).toBeTruthy();
  });
});
