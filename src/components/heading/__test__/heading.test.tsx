import React from "react";
import { cleanup, render } from "@testing-library/react";
import Heading from "../index";

const getMockProps = (data = { text: "Test Label" }) => data;

describe("Heading", () => {
  afterEach(cleanup);

  it("test label of heading", () => {
    const mockProps = getMockProps();

    const { container } = render(<Heading {...mockProps} />);

    const headingEl = container.querySelector("h2") as HTMLHeadingElement;

    expect(headingEl).toHaveTextContent(mockProps.text);
  });
});
