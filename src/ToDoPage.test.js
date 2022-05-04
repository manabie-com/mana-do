import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ToDoPage from "./ToDoPage";

describe("ToDoPage Component", () => {
  it("has an input tag", () => {
    const component = ReactTestUtils.renderIntoDocument(<ToDoPage />);
    var input = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
  });

  it("has a ToDo__container class", () => {
    const component = ReactTestUtils.renderIntoDocument(<ToDoPage />);
    var node = ReactTestUtils.findRenderedDOMComponentWithClass(
      component,
      "ToDo__container"
    );
  });
});
