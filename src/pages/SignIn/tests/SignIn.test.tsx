import React from "react";
import { render } from "@testing-library/react";

import SignIn from "../index";

const renderComponent = () => {
  const utils = render(<SignIn />);

  const signIn = utils.container;
  return { ...utils, signIn };
};

describe("<SignIn />", () => {
  it("should render input user id", () => {
    const { signIn } = renderComponent();
    expect(signIn.querySelector("#user_id").tagName.toLowerCase()).toMatch(
      "input"
    );
  });

  it("should render input password", () => {
    const { signIn } = renderComponent();
    expect(signIn.querySelector("#password").tagName.toLowerCase()).toMatch(
      "input"
    );
  });

  it("should render button", () => {
    const { signIn } = renderComponent();
    expect(signIn.querySelector(".btn__action").tagName.toLowerCase()).toMatch(
      "button"
    );
  });
});
