import React from "react";
import { render, cleanup } from "@testing-library/react";

import Button from ".";

afterEach(cleanup);

describe("Button", () => {
  it("children Prop", () => {
    const { queryByText } = render(<Button>Text</Button>);

      const isExist = queryByText("Text");
      expect(isExist).toBeInTheDocument();

      const isNotExist = queryByText("Text1");
      expect(isNotExist).not.toBeInTheDocument();
  });

  it("type Prop", () => {
    const { queryByText } = render(<Button type="submit">Text</Button>);

    const button = queryByText("Text");
    const type = button?.getAttribute("type");

    expect(type).toBe("submit");
  });

  it("className Prop", () => {
    const { queryByText } = render(<Button className="test">Text</Button>);

    const button = queryByText("Text");

    const className = button?.getAttribute("class");
  
    expect(className).toBe("test");
  });

  it("onClick Prop", () => {
    const mockCallBack = jest.fn();
    const { queryByText } = render(<Button onClick={mockCallBack}>Text</Button>);

    const button = queryByText("Text");

    button?.click();

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
