import React from "react";
import renderer from "react-test-renderer";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import TodoPage from "./ToDoPage";

describe("TodoPage test", () => {
  it("should render TodoPage correctly", () => {
    const component = renderer.create(<TodoPage />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  beforeEach(() => render(<TodoPage />));

  it("should change value and create new element when type and enter in todo input", async () => {
    const textbox = screen.getByTestId("todo__input");
    await userEvent.type(textbox, "task 1");

    expect(textbox).toHaveValue("task 1");
  });
});
