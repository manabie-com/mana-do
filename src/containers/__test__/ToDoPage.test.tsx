import { fireEvent, render } from "@testing-library/react";
import ToDoPage from "containers/ToDoPage";
import React from "react";
import { getElementByTestId } from "utils/testUtils";

const renderComponent = () => {
  return render(<ToDoPage />);
};

describe("<ToDoPage /> rendering", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent();
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render UI correctly", () => {
    renderComponent();

    const inputElement = getElementByTestId("input") as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute(
      "placeholder",
      "What need to be done?"
    );
  });
});

describe("<ToDoPage /> interacting", () => {
  it("should be able to type input", () => {
    const defaultValue = "Doing excercises";

    renderComponent();
    const inputElement = getElementByTestId("input") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: defaultValue } });
    expect(inputElement.value).toBe(defaultValue);
  });
});
