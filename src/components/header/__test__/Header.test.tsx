import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "../Header";

const renderComponent = () => {
  return render(<Header />);
};

describe("<Header /> rendering", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent();
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render UI correctly", () => {
    renderComponent();

    const titleElement = screen.getByText("MANA DO");

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("header__title");
  });
});
