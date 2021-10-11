import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import { Paper } from "components/commons";
import { Elevation } from "components/commons/Paper";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

const propsTest = {
  elevation: 1 as Elevation,
  className: "Paper-className-test",
};

let container: HTMLElement;

beforeEach(() => {
  container = render(<Paper {...propsTest} />).container;
});

afterEach(cleanup);

test("Paper: render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Paper {...propsTest} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
test("Paper: props of paper", () => {
  const paperEl = container.querySelector(".paper-custom") as HTMLInputElement;
  expect(paperEl?.className).toContain("Paper-className-test");
  expect(paperEl?.className).toContain(
    `paper-custom-elevation-${propsTest.elevation}`
  );
});
test("Paper: match snapshot", () => {
  const tree = renderer.create(<Paper {...propsTest} />).toJSON();
  expect(tree).toMatchSnapshot();
});
