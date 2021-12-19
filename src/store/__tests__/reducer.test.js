import reducer, { initialState } from "../reducer";
import * as actions from "../actions";
import expect from "expect";
import { TodoStatus } from "../../models/todo";

describe("Test reducer", () => {
  it("Test -- SET_APP_STATE", () => {
    const state = initialState;
    const action = {
      type: actions.SET_APP_STATE,
      payload: state,
    };

    const result = reducer(state, action);
    expect(result).toEqual(state);
  });

  it("Test -- CREATE_TODO", () => {
    const state = initialState;
    const payload = {
      id: "1",
      user_id: "1",
      content: "1",
      status: TodoStatus.All,
      created_date: "1",
      contentEditable: true,
    };

    const action = {
      type: actions.CREATE_TODO,
      payload: payload,
    };

    const result = reducer(state, action);

    const expectState = {
      ...state,
      todos: [payload],
    };
    expect(result).toEqual(expectState);
  });

  it("Test -- UPDATE_THEME", () => {
    const state = initialState;

    const payload = state.theme;
    const action = {
      type: actions.UPDATE_THEME,
      payload,
    };

    const result = reducer(state, action);
    expect(result).toEqual(state);
  });

  it("Test -- UPDATE_SELECTED_STATUS", () => {
    const state = initialState;

    const payload = state.status;
    const action = {
      type: actions.UPDATE_SELECTED_STATUS,
      payload,
    };

    const result = reducer(state, action);
    expect(result).toEqual(state);
  });
});
