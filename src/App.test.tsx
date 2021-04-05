import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

const renderComponent = () => {
  const utils = render(<App />);

  const app = utils.container;
  return { ...utils, app };
};

describe("<App />", () => {
  afterAll(() => {
    localStorage.clear();
  });

  it("should render sign in page", () => {
    const { app } = renderComponent();
    expect(app.getElementsByClassName("form__signIn")).toHaveLength(1);
  });

  it("should render todo page", () => {
    localStorage.setItem("token", "testabc.xyz.ahk");

    const { app } = renderComponent();
    expect(app.getElementsByClassName("todo__container")).toHaveLength(1);
  });

});
