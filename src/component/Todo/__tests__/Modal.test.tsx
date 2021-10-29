import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import Modal from "component/Todo/Modal";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Edit Modal", () => {
  test("show modal has a form", () => {
    render(
      <Modal
        onEditSubmit={jest.fn()}
        id="test"
        content="test"
        toggleModal={jest.fn()}
      />
    );
    const form = screen.getByTestId("todo-form");
    const input = screen.getByTestId("todo-input");
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("after click outside, toggleModal should run", () => {
    const toggleModalMock = jest.fn();
    render(
      <Modal
        onEditSubmit={jest.fn()}
        id="test"
        content="test"
        toggleModal={toggleModalMock}
      />
    );
    const overlay = screen.getByTestId("modal-overlay");
    userEvent.click(overlay);
    expect(toggleModalMock).toHaveBeenCalledTimes(1);
  });
});
