import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import TodoCreate from ".";

describe(`${TodoCreate.name} Test Suite`, () => {
  let inputEle: HTMLElement;

  beforeEach(() => {
    render(<TodoCreate />);

    inputEle = screen.getByTestId("create-todo-input");
  });

  afterEach(() => {
    cleanup();
  });

  test(`input SHOULD display corectly`, () => {
    expect(inputEle).toBeInTheDocument();
    expect(inputEle).toHaveValue("");
  });

  test(`input content SHOULD NOT empty before press Enter and SHOULD empty after press Enter`, async () => {
    const mockContent = "Should pass this test";

    fireEvent.change(inputEle, { target: { value: mockContent } });
    expect(inputEle).toHaveValue(mockContent);

    fireEvent.keyDown(inputEle, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(inputEle).toHaveValue("");
  });
});
