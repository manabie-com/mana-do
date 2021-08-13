import { render, screen } from "@testing-library/react";
import { Banner } from "../Banner";
import userEvent from "@testing-library/user-event";

describe("Banner", () => {
  it("Should void onKeyDown", () => {
    const onKeyDown = jest.fn();
    render(<Banner onKeyDown={onKeyDown} />);
    const input = screen.getByPlaceholderText("What need to be done?");

    userEvent.type(input, "Todo something");
    expect(onKeyDown).toBeCalled();
  });
});
