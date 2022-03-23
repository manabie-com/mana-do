import "@testing-library/jest-dom";
import { act, cleanup, render, screen } from "@testing-library/react";
import React from "react";
import CreateTodo from "../components/FormTodo/CreateTodo";

describe(`Test Create Todo`, () => {
  let inputElement: HTMLElement;

  beforeEach(async () => {
    render(<CreateTodo testId="create-input"/>);

    inputElement = screen.getByTestId("create-input");
  });

  afterEach(() => {
    cleanup();
  });

  test(`Input display on screen`, () => {
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });
});