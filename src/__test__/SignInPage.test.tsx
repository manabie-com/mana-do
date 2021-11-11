import React from "react";
import {
    render,
    screen,
    fireEvent,
    waitForElement,
    cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SignInPage from "../pages/SignInPage";
import { mockUser } from "./mockData";

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});
describe("Test Sign In page", () => {
    let form: any;
    let userId: any;
    let password: any;

    beforeEach(() => {
        render(<SignInPage />);
        form = screen.getByTestId("form");
        userId = screen.getByTestId("userId");
        password = screen.getByTestId("password");
    });

    test("Sign In form should appear with blank inputs", () => {
        expect(form).toHaveFormValues({
            userId: "",
            password: "",
        });
    });

    test("inputs are changeable", () => {
        userEvent.type(userId, mockUser.validUser.userId);
        userEvent.type(password, mockUser.validUser.password);
        expect(userId.value).toBe(mockUser.validUser.userId);
        expect(password.value).toBe(mockUser.validUser.password);
    });

    test("error message should show up if enter wrong data", async () => {
        userEvent.type(userId, mockUser.invalidUser.userId);
        userEvent.type(password, mockUser.invalidUser.password);
        fireEvent.submit(form);
        await waitForElement(() => screen.getByTestId("error-message"))
        expect(screen.getByTestId("error-message")).toBeInTheDocument();
        // error-message will disappear when user typing 
        userEvent.type(userId, "some text");
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
    });

    test("Redirect to todo page when sign in successfully", () => {
        userEvent.type(userId, mockUser.validUser.userId);
        userEvent.type(password, mockUser.validUser.password);
        fireEvent.submit(form);
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
    });
});