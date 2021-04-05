import React from "react";
import { render } from "@testing-library/react";

import Form, { Props } from "../Form";

const options = [
  {
    id: "user_id",
    name: "userId",
    text: "text",
    label: "User id",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "Password",
  },
];
const children = <button type="submit">Sign in</button>;
const renderComponent = (props?: Props) => {
  const utils = render(
    <Form
      onSubmit={() => {}}
      options={options}
      error={props?.error || false}
      messageError={props?.messageError || ""}
      clearError={() => {}}
    >
      {children}
    </Form>
  );

  const form = utils.container.querySelector('form');
  return { ...utils, form };
};

describe("<Form />", () => {
  it("should have children", () => {
    const { form } = renderComponent();
    expect(form.children).toHaveLength(3);
  });
});
