import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr } from "test/testUtils";
import Input, { IInputProps } from "..";

const setUp = (props?: IInputProps): ShallowWrapper => {
  const wrapper = shallow(<Input {...props} />)
  return wrapper;
}

describe("<Input /> rendering", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = setUp();
  })
  test("render Input without errors", () => {
    const input = findByTestAttr(wrapper, "input");
    expect(input.length).toBe(1)
  })
})
describe("<Input /> interactions", () => {
  test("call onChange function with correct name and value", () => {
    const name = "name test";
    const props: IInputProps = {
      name, 
      onChange: jest.fn()
    }
    const wrapper = setUp(props);
    const input = findByTestAttr(wrapper, "input");
    const targetValue = "Hello World";
    input.simulate("change", {
      target: { value: targetValue }
    })
    expect(props.onChange).toHaveBeenCalledWith({
      name,
      value: targetValue
    })
  })
  test("call onKeyDown function with correct key press", () => {
    const name = "name test";
    const props: IInputProps = {
      name, 
      onKeyDown: jest.fn()
    }
    const wrapper = setUp(props);
    const input = findByTestAttr(wrapper, "input");
    input.simulate('keydown', { key: "Enter" });
    expect(props.onKeyDown).toHaveBeenCalledWith({ key: "Enter"})
  })
})