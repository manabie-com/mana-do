import React from "react";
import { screen, render } from "@testing-library/react";
import "jest-styled-components";
import App from "./App";
import { mockToken } from "./service/api-frontend";
import { ROUTES } from "./utils/constants";

const renderWithRouter = (ui: any, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui);
};

test("app render /sign-in page", () => {
  render(<App />);
  expect(screen.getByText(/Username/i)).toBeInTheDocument();
  expect(screen.getByText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/SIGN IN/i)).toBeInTheDocument();
});

test("app render /todo page", () => {
  localStorage.setItem("token", mockToken);
  renderWithRouter(<App />, { route: ROUTES.TODO });
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  expect(screen.getByText(/Draggable Todos/i)).toBeInTheDocument();
  expect(screen.getByText(/active left/i)).toBeInTheDocument();
});
