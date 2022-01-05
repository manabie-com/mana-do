import { fireEvent, render } from "@testing-library/react";
import { CreateTodo } from "../CreateTodo";
import React from "react";
import "@testing-library/jest-dom";

describe("CreateTodo", () => {
  test("should create todo success",  () => {
    const { getByPlaceholderText} = render(
      <CreateTodo dispatch={() => {}} />
    );
    const input = getByPlaceholderText("What need to be done?");
    expect(input).toHaveValue("");
    fireEvent.change(input, { target: { value: "new todo" } });
    expect(input).toHaveValue("new todo");
  });
});

