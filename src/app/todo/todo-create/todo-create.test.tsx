import "@testing-library/jest-dom";
import { act, cleanup, render, screen } from "@testing-library/react";
import React from "react";
import TodoCreate from ".";

describe(`${TodoCreate.name} Test Suite`, () => {
  let inputEle: HTMLElement;

  beforeEach(async () => {
    render(<TodoCreate />);

    inputEle = screen.getByTestId("create-todo-input");
  });

  afterEach(() => {
    cleanup();
  });

  test(`if input display corectly`, () => {
    expect(inputEle).toBeInTheDocument();
    expect(inputEle).toHaveValue("");
  });
});
