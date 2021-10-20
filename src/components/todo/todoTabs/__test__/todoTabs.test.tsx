import React from "react";
import { cleanup, render } from "@testing-library/react";
import TodoTabs from "..";
import userEvent from "@testing-library/user-event";
import { TodoContext, TodoContextType } from "../../../../hooks/useTodo";
import { AppState } from "../../../../store/reducer";
import { setShowing } from "../../../../store/actions";
import { Constants } from "../../../../constants";
import { TodoStatus } from "../../../../models/todo";

const contextValue: TodoContextType = {
  state: {} as AppState,
  dispatch: jest.fn(),
};

describe("TodoTabs", () => {
  afterEach(cleanup);

  it("test click button", () => {
    const { getByTestId } = render(
      <TodoContext.Provider value={contextValue}>
        <TodoTabs />
      </TodoContext.Provider>
    );

    const allBtnEl = getByTestId("all") as HTMLButtonElement;
    const activeBtnEl = getByTestId("active") as HTMLButtonElement;
    const completedBtnEl = getByTestId("completed") as HTMLButtonElement;

    userEvent.click(allBtnEl);

    expect(contextValue.dispatch).toBeCalledWith(setShowing(Constants.ALL));

    userEvent.click(activeBtnEl);

    expect(contextValue.dispatch).toBeCalledWith(setShowing(TodoStatus.ACTIVE));

    userEvent.click(completedBtnEl);

    expect(contextValue.dispatch).toBeCalledWith(
      setShowing(TodoStatus.COMPLETED)
    );
  });
});
