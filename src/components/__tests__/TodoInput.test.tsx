import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { TodoInput, TodoInputProps } from "components";

const props: TodoInputProps = {
  inputRef: {
    current: {
      value: "",
    },
  },
  _onCreateTodo: jest.fn(),
};

describe("TodoInput component", () => {
  describe("Add todo", () => {
    afterEach(cleanup);
    beforeEach(() => {
      render(<TodoInput {...props} />);
    });

    it("Todo input is display", () => {
      expect(screen.queryByTestId("todo-input")).toBeInTheDocument();
    });

    it("Todo content should not empty", async () => {
      const inputEle = screen.getByTestId("todo-input");
      fireEvent.keyDown(inputEle, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });

      expect(props._onCreateTodo).toBeCalledTimes(0);
    });

    it("Add new todo when content is not empty", async () => {
      const inputEle = screen.getByTestId("todo-input");
      props.inputRef.current.value = "new todo";
      fireEvent.keyDown(inputEle, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });

      expect(props._onCreateTodo).toBeCalledTimes(1);
    });
  });
});
