import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Input from ".";

afterEach(cleanup);

describe("Input", () => {
  it("onChange Prop", () => {
    const mockCallBack = jest.fn();
    const { container } = render(<Input />);
    const input = container.querySelector("input");
  
    if (input) {
      fireEvent.change(input, mockCallBack());
  
      expect(mockCallBack.mock.calls.length).toEqual(1);
    } else {
      throw new Error("Can't find input");
    }
  });
  
  it("onKeyDown Prop", () => {
    const mockCallBack = jest.fn();
    const { container } = render(<Input />);
    const input = container.querySelector("input");
  
    if (input) {
      fireEvent.keyDown(input, mockCallBack());
  
      expect(mockCallBack.mock.calls.length).toEqual(1);
    } else {
      throw new Error("Can't find input");
    }
  });
  
  it("onBlur Prop", () => {
    const mockCallBack = jest.fn();
    const { container } = render(<Input />);
    const input = container.querySelector("input");
  
    if (input) {
      fireEvent.blur(input, mockCallBack());
  
      expect(mockCallBack.mock.calls.length).toEqual(1);
    } else {
      throw new Error("Can't find input");
    }
  });
  
  it("value Prop", () => {
    const { container } = render(<Input onChange={()=>{}} value='test-value'/>);
    const input = container.querySelector("input");
  
    if (input) {
      const value = input.value;
      expect(value).toBe("test-value");
    } else {
      throw new Error("Can't find input");
    }
  });
  
  it("defaultValue Prop", () => {
    const { container } = render(<Input onChange={()=>{}} defaultValue='test-defaultValue'/>);
    const input = container.querySelector("input");
  
    if (input) {
      const defaultValue = input.defaultValue;
      expect(defaultValue).toBe("test-defaultValue");
    } else {
      throw new Error("Can't find input");
    }
  });
});