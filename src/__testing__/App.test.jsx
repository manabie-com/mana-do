import {
  act,
  fireEvent,
  getByTestId,
  queryAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import React from "react";
import TodosList from "../components/todosList";
import FormLoginContainer from "../Containers/formLoginContainer";
import TodoCreationContainer from "../Containers/todoCreationContainer";

const mockTodos = [
  {
    id: "1",
    user_id: "user1",
    content: "task 1",
    created_date: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "user1",
    content: "task 2",
    created_date: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "user1",
    content: "task 3",
    created_date: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: "user1",
    content: "task 4",
    created_date: new Date().toISOString(),
  },
  {
    id: "5",
    user_id: "user1",
    content: "task 5",
    created_date: new Date().toISOString(),
  },
];

describe("todos page", () => {
  beforeAll(() => {
    global.localStorage.setItem("token", "token");
  });
  afterAll(() => global.localStorage.clear());

  /////////////
  test("TodosList component recevie todo-list from prop", () => {
    const prop = {
      showTodos: mockTodos,
      onUpdateTodoStatus: () => { },
      todosDispatch: () => { },
    };
    const { container } = render(<TodosList {...prop} />);

    const todos = queryAllByTestId(container, /^todoItem-/);
    expect(todos.length).toEqual(mockTodos.length);

    const todo3 = getByTestId(container, "content-3");
    expect(todo3.textContent).toBe(mockTodos[2].content);
  });


  test("show error when add empty todo", () => {
    act(() => {
      render(<TodoCreationContainer />);
      fireEvent.keyDown(screen.getByTestId("todoCreation"), { key: "Enter" });
    })

    const error = screen.getByTestId("todoCreationError").textContent;
    expect(error).toBeInTheDocument;
  });

  test("dont show error when add todo", () => {
    act(() => {
      render(<TodoCreationContainer />);
      fireEvent.change(screen.getByTestId("todoCreation"), {
        target: { value: "todotest" },
      });
      fireEvent.keyDown(screen.getByTestId("todoCreation"), { key: "Enter" });
    })

    const error = screen.queryByTestId("todoCreationError");
    expect(error).toBeUndefined;
  });
});

describe("signin page", () => {
  test("login with empty user name and passwrod", () => {
    act(() => {
      render(<FormLoginContainer />);
      fireEvent.click(screen.getByTestId("signinSubmit"));
    })

    const error = screen.queryByTestId("signinError");
    expect(error).toBeInTheDocument;

  })
  test("losadgin", () => {
    act(() => {
      render(<FormLoginContainer />);
      fireEvent.change(screen.getByTestId("signinName"), { target: { value: "firstUser" } });
      fireEvent.change(screen.getByTestId("signinPassword"), { target: { value: "example" } });
      fireEvent.click(screen.getByTestId("signinSubmit"));
    })

    expect(localStorage.getItem("token")).toHaveValue;
  })

})