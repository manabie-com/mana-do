import React from "react";
import { render, RenderResult } from "@testing-library/react";
import ToDoPage from "../pages/ToDoPage";
import { RouteComponentProps } from "react-router-dom";

const routeMock = {
  history: {} as any,
  location: {} as any,
  match: {} as any,
} as RouteComponentProps;

test("TodoPage: has toolbar while render", () => {
  const TodDoPage: RenderResult = render(
    <ToDoPage
      history={routeMock.history}
      location={routeMock.location}
      match={routeMock.match}
    />
  );
  const Placeholder = TodDoPage.getByText(/Show/i);
  expect(Placeholder).toBeInTheDocument();
});

test("TodoPage: has loading text while fetching", () => {
  const TodDoPage: RenderResult = render(
    <ToDoPage
      history={routeMock.history}
      location={routeMock.location}
      match={routeMock.match}
    />
  );
  const LoadingText = TodDoPage.getByText(/Loading/i);
  expect(LoadingText).toBeInTheDocument();
});
