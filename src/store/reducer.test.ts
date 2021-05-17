import React from "react";
import ReactDOM from "react-dom";
import TodoAfter from "../containers/TodoAfter";
import { render, fireEvent, cleanup } from "@testing-library/react";
import reducer, { initialState } from "./reducer";
import * as ACTIONS from "./actions";

afterEach(cleanup);

describe("Test the reducer and actions", () => {
  it("should return the initial state", () => {
    expect(initialState).toEqual({ todos: [], toggleAll: false });
  });

//   it("should change stateprop1 from false to true", () => {
//     expect(reducer(initialState, ACTIONS.CREATE_TODO)).toEqual({
//       stateprop1: true,
//     });
//   });
});
