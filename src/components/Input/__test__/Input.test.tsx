import { fireEvent, render } from "@testing-library/react";
import { Input } from "../Input";

it("Should return right when change value input", () => {
  const { getByLabelText } = render(<Input label="label" />);

  const input = getByLabelText(/label/i) as HTMLInputElement;
  fireEvent.change(input, { target: { value: "name" } });
  expect(input.value).toBe("name");
});
