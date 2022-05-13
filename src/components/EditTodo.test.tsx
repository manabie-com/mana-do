import React from "react";
import {
	render,
	fireEvent,
	cleanup,
	waitFor,
	act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditTodo from "components/EditTodo";
import { createTodo } from "test/data";
import { Todo } from "models/todo";

jest.mock("service", () => {
	const { createTodo } = require("test/data");

	const findById = async (id: string): Promise<Todo> => {
		return Promise.resolve(createTodo(id));
	};
	return {
		findById,
	};
});

describe("EditTodo", () => {
	it("should render without crashing", async () => {
		const props = {
			todoId: "12",
			onCancel: jest.fn(),
			onConfirm: jest.fn(),
		};
		let screen: any;
		await act(async () => {
			screen = render(<EditTodo {...props} />);
		});

		const component = await waitFor(() =>
			screen.getByLabelText("edit-todo-form"),
		);
		expect(component).toBeInTheDocument();
	});
	describe("props", function () {
		const onCancel = jest.fn();
		const onConfirm = jest.fn();
		const props = {
			todoId: "12",
			onCancel,
			onConfirm,
		};
		let screen: any;
		beforeEach(async () => {
			await act(async () => {
				screen = render(<EditTodo {...props} />);
			});
		});
		afterEach(cleanup);

		it("onCancel prop should fired when click close button", () => {
			const item = screen.getByLabelText("edit-todo-close-btn");
			expect(onCancel).toHaveBeenCalledTimes(0);
			fireEvent.click(item);
			expect(onCancel).toHaveBeenCalledTimes(1);
		});
		it("onCancel prop should fired when click close button", () => {
			const item = screen.getByLabelText("edit-todo-backdrop");
			expect(onCancel).toHaveBeenCalledTimes(0);
			fireEvent.click(item);
			expect(onCancel).toHaveBeenCalledTimes(1);
		});
		it("onConfirm prop should fired when form enter and receive correct params", async () => {
			const input = screen.getByLabelText("todo-form-input-content");
			const content = "typing some text";
			const todo = createTodo("12");

			expect(onConfirm).toHaveBeenCalledTimes(0);

			await userEvent.clear(input);
			await userEvent.type(input, content);
			await userEvent.keyboard("{Enter}");

			expect(onConfirm).toHaveBeenCalledTimes(1);
			expect(onConfirm).toHaveBeenCalledWith({
				...todo,
				content,
			});
		});
	});
});
