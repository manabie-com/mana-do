import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";

describe("Test <App/>", () => {
  it("Renders App", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
