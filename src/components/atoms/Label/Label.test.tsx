import React from "react";
import { render,  cleanup } from "@testing-library/react";

import Label from ".";

afterEach(cleanup);

describe("Label", () => {
  it("children Prop", () => {
    const { queryByText } = render(<Label>Text</Label>);

    const isExist = queryByText("Text");

    expect(isExist).toBeInTheDocument();

    const isNotExist = queryByText("Text1");

    expect(isNotExist).not.toBeInTheDocument();
  });

  it("className Prop", () => {
    const { container } = render(<Label className="test">Text</Label>);

    const label = container.querySelector("label");

    const className = label?.className;

    expect(className).toBe("test");
  });
});
