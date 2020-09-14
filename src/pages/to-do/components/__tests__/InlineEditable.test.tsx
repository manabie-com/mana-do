import React from "react";
import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";
import InlineEditable from "../InlineEditable";

afterEach(cleanup);

const mockProps = {
  content: "111",
  onSave: jest.fn(),
};

test("change value on enter after edit", async () => {
  const { container } = render(
    <InlineEditable {...mockProps}>
      <input></input>
    </InlineEditable>
  );

  const div = (container as any).querySelector(".InlineEditable__wrapper_view");
  fireEvent.dblClick(div);
  const input = await waitFor(() => (container as any).querySelector("input"));
  const editedDiv = await waitFor(() =>
    (container as any).querySelector(".InlineEditable__wrapper__edit")
  );
  fireEvent.change(input, {
    target: { value: "222" },
  });
  (fireEvent as any).keyDown(editedDiv, { key: "Enter" });

  //after enter
  const div1 = (container as any).querySelector(
    ".InlineEditable__wrapper_view"
  );
  fireEvent.dblClick(div1);
  const input1 = await waitFor(() => (container as any).querySelector("input"));
  await waitFor(() => expect(input1.value).toBe("222"));
});

test("unchange value on blur after edit", async () => {
  const { container } = render(
    <InlineEditable {...mockProps}>
      <input></input>
    </InlineEditable>
  );

  const div = (container as any).querySelector(".InlineEditable__wrapper_view");
  fireEvent.dblClick(div);
  const input = await waitFor(() => (container as any).querySelector("input"));

  const editedDiv = await waitFor(() =>
    (container as any).querySelector(".InlineEditable__wrapper__edit")
  );
  fireEvent.change(input, {
    target: { value: "222" },
  });
  (fireEvent as any).blur(editedDiv);

  //after blur
  const div1 = (container as any).querySelector(
    ".InlineEditable__wrapper_view"
  );
  fireEvent.dblClick(div1);
  const input1 = await waitFor(() => (container as any).querySelector("input"));
  await waitFor(() => expect(input1.value).toBe("111"));
});
