import * as React from "react";
import { shallow } from "enzyme";
import Todo, { onDeleteTodoStatus } from "../todo";
import { deleteTodo } from "src/store/actions";

describe("ToDo", () => {
  it("should match a snapshot", () => {
    const routeComponentPropsMock = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
    };
    expect(shallow(<Todo {...routeComponentPropsMock} />)).toMatchSnapshot();
  });
});

describe("onDeleteTodoStatus", () => {
  it("should run correctly", () => {
    const dispatch = jest.fn();
    const id = "id";
    const fn = onDeleteTodoStatus(dispatch);

    fn(id);
    expect(dispatch).toHaveBeenCalledWith(deleteTodo(id));
  });
});
