import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { SignInPage } from "../SignInPage";

describe("SignInPage", () => {
  it("Should show error auth", async () => {
    render(<SignInPage />);

    userEvent.type(screen.getByLabelText(/user id/i), "firstUser");
    userEvent.type(screen.getByLabelText(/password/i), "firstUser");
    userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    const error = await screen.findByText(/incorrect/i);
    expect(error).toBeInTheDocument();
  });

  it("Should be on home - login successfull", async () => {
    render(<SignInPage />);

    userEvent.type(screen.getByLabelText(/user id/i), "firstUser");
    userEvent.type(screen.getByLabelText(/password/i), "expamle");

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    await waitFor(() => {
      expect(global.window.location.pathname).toEqual("/");
    });
  });
});
