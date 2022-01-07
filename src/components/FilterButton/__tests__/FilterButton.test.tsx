import React from "react";
import { expect, test, describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import FilterButton, { FilterButtonProps } from "../index";

describe("FilterButton Snapshot", () => {
  test("should render with active status", () => {
    const props: FilterButtonProps = {
      active: true,
      onClick: () => {},
      children: "TEST",
    };
    const { container } = render(<FilterButton {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render without active status", () => {
    const props: FilterButtonProps = {
      active: false,
      onClick: () => {},
      children: "TEST",
    };
    const { container } = render(<FilterButton {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

test("should render a button with correct children", () => {
  const text = "TEST";
  const props: FilterButtonProps = {
    active: false,
    onClick: () => {},
    children: text,
  };
  const element = render(<FilterButton {...props} />);
  const filterElement = element.getByTestId("btn-filter");
  expect(filterElement.innerHTML).toEqual(text);
});
