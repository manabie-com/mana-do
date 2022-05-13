import React from "react";
import userEvent from "@testing-library/user-event";
import { render, cleanup } from "@testing-library/react";
import TodoForm from "components/TodoForm";

describe("TodoForm", () => {
	it("should render without crashing", () => {
		const props = {
			content: "test",
			onSubmit: jest.fn(),
		};
		const screen = render(<TodoForm {...props} />);
		expect(screen.getByLabelText("todo-form")).toBeInTheDocument();
	});

	describe("props", function () {
		const onSubmit = jest.fn();
		const props = {
			content: "test",
			onSubmit,
		};
		let screen: any;

		beforeEach(() => {
			screen = render(<TodoForm {...props} />);
		});
		afterEach(cleanup);

		it("content prop should correct", () => {
			const item = screen.getByLabelText("todo-form-input-content");
			expect((item as HTMLInputElement).value).toBe(props.content);
		});

		it("onSubmit prop should correct behaviour and receive correct params", async () => {
			const input = screen.getByLabelText("todo-form-input-content");
			const content = "typing some text";

			expect(onSubmit).toHaveBeenCalledTimes(0);

			await userEvent.clear(input);
			await userEvent.type(input, content);
			await userEvent.keyboard("{Enter}");

			expect(onSubmit).toHaveBeenCalledTimes(1);
			expect(onSubmit).toHaveBeenCalledWith(content);
		});
	});
});
