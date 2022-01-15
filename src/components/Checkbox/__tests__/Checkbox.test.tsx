import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr } from "test/testUtils";
import Checkbox, { ICheckboxProps } from "..";

const setUp = (props?: ICheckboxProps): ShallowWrapper => {
 const wrapper = shallow(<Checkbox {...props} />)
 return wrapper;
}

describe("<Checkbox /> rendering", () => {
  let wrapper: ShallowWrapper;
  const props = {
    checked: true
  } 
  beforeEach(() => {
    wrapper = setUp(props);
  })
  test("render Checkbox without errors", () => {
    const checkbox = findByTestAttr(wrapper, "checkbox");
    expect(checkbox.length).toBe(1);
  })
  test("render Checkbox Input without errors", () => {
    const checkboxInput = findByTestAttr(wrapper, "checkbox-input");
    expect(checkboxInput.length).toBe(1);
  })
  test("render correct Checkbox Input", () => {
    const checkboxInput = findByTestAttr(wrapper, "checkbox-input");
    expect(checkboxInput.prop("checked")).toBe(props.checked);
  })
})

describe("<Checkbox /> interactions", () => {
  let wrapper: ShallowWrapper;
  const props = {
    onChange: jest.fn(),
  } 
  beforeEach(() => {
    wrapper = setUp(props);
  })
  test("call onChange when clicked checkbox", () => {
    const checkboxInput = findByTestAttr(wrapper, "checkbox-input");
    checkboxInput.simulate("change");
    expect(props.onChange).toHaveBeenCalled();
  })
})