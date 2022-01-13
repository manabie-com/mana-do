import { shallow } from "enzyme";
import { findByTestAttribute } from "../../test/testUtils";

import React from "react";
import ToDo from "..";

describe("Render component", () => {
  test("will render todo component", () => {
    let component = shallow(<ToDo />);
    expect(findByTestAttribute(component, "todo-container").exists()).toEqual(
      true
    );
  });
});

describe("Test render empty todo list", () => {
  test("will render text nothing to do if todo list is empty", () => {
    let component = shallow(<ToDo />);
    expect(findByTestAttribute(component, "nothing-to-do").exists()).toEqual(
      true
    );
  });
});
