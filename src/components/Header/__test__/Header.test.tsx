import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

// render
const renderComponent = () => {
  return render(<Header title="MANA-DO" />);
};

// test case
describe("<Header/>", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent();
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render UI correctly", () => {
    renderComponent();
    const title = screen.getByText("MANA-DO");
    expect(title).toBeInTheDocument();
  });
});
