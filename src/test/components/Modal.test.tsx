import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import "jest-styled-components";
import Modal from "../../components/Modal";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // @ts-ignore
  unmountComponentAtNode(container);
  container?.remove();
  container = null;
});

it("should render todo item", () => {
  const close = jest.fn();
  act(() => {
    render(
      <Modal visible title="title" onClose={close} children="children" />,
      container
    );
  });
  expect(container?.getRootNode()).toBeTruthy();
});
