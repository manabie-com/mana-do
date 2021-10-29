import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom";
import App from "./App";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
const renderWithRouter = (ui: JSX.Element, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: MemoryRouter });
};

describe("gd", () => {
  test("app rendering sign in page initially", () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Log In to ToDo/i)).toBeInTheDocument();
  });

  test("direct to todo page", () => {
    renderWithRouter(<App />, { route: "/todo" });
    expect(screen.getByText(/To-Dos/i)).toBeInTheDocument();
  });

  test("landing on a bad page", () => {
    renderWithRouter(<App />, { route: "/non-exist-route" });
    expect(
      screen.getByText(/Sorry, the page does not exist/i)
    ).toBeInTheDocument();
  });
});
