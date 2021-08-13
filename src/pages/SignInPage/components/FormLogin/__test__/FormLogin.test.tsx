import { render, screen, waitFor } from "@testing-library/react";
import { FormLogin } from "../FormLogin";
import userEvent from "@testing-library/user-event";

const stepUp = () => {
  const handleSubmit = jest.fn();
  render(<FormLogin onSubmit={handleSubmit} />);
  return handleSubmit;
};

describe("FormLogin", () => {
  it("should show return password, userId ", async () => {
    const handleSubmit = stepUp();
    userEvent.type(screen.getByLabelText(/user id/i), "firstUser");
    userEvent.type(screen.getByLabelText(/password/i), "firstUser");
    userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        password: "firstUser",
        userId: "firstUser",
      })
    );
  });

  it("should show  error password or userId", async () => {
    stepUp();
    userEvent.type(screen.getByLabelText(/user id/i), "");
    userEvent.type(screen.getByLabelText(/password/i), "");
    const errors = document.querySelectorAll(".input__error");
    userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      errors.forEach((error) => {
        expect(error).toBeVisible();
      });
    });

    userEvent.type(screen.getByLabelText(/user id/i), "2");
    userEvent.type(screen.getByLabelText(/password/i), "2345600");
    userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      errors.forEach((error) => {
        expect(errors[0]).toHaveTextContent("Ít nhất 2 kí tự");
      });
    });

    userEvent.type(screen.getByLabelText(/user id/i), "nameok");
    userEvent.type(screen.getByLabelText(/password/i), "12");
    userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      errors.forEach((error) => {
        expect(errors[1]).toHaveTextContent("Ít nhất 4 kí tự");
      });
    });
  });
});
