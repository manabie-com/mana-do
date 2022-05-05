/* eslint-disable @typescript-eslint/no-empty-function */
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import TodoPage from "../ToDoPage";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const addTodoItem = async (todoInput: Element, todoItems: string[]) => {
	for (const todoItem of todoItems) {
		fireEvent.change(todoInput, { target: { value: todoItem } });
		expect((todoInput as HTMLInputElement).value).toEqual(todoItem);
		(todoInput as HTMLInputElement).focus();
		await user.keyboard("{Enter}");
	}
};

describe("<TodoPage />", () => {
	const arrayInput = ["todoItem 1", "todoItem 2", "todoItem 3"];
	beforeEach(async () => {
		render(<TodoPage />);
		const todoInput = screen.getByTestId("todoInput");
		await addTodoItem(todoInput, arrayInput);
	});
	afterEach(() => {
		// clear all todo items
		fireEvent.click(screen.getByText("Clear all todos"));
	});
	test("Input todoItem and add new item", async () => {
		const arrayInput = ["todoItem 1", "todoItem 2", "todoItem 3"];
		await waitFor(() =>
			arrayInput.forEach((todoItem) => {
				expect(screen.getByText(todoItem)).toBeInTheDocument();
			})
		);
	});
	describe("Double Click to todo item 1 to edit it", () => {
		test("Expect todo item edtied", async () => {
			const todoInput = screen.getByTestId("todoInput");
			const todoItem1 = screen.getByText("todoItem 1");
			fireEvent.dblClick(todoItem1);
			(todoInput as HTMLInputElement).focus();
			await user.keyboard(" Edited");
			await user.keyboard("{Enter}");
			await waitFor(() =>
				expect(screen.getByText("todoItem 1 Edited")).toBeInTheDocument()
			);
		});
		test("Click outside to get out edited mode", async () => {
			const todoInput = screen.getByTestId("todoInput");
			const todoItem1 = screen.getByText("todoItem 1");
			fireEvent.dblClick(todoItem1);
			(todoInput as HTMLInputElement).focus();
			await user.keyboard(" Edited 2");
			await user.keyboard("{Enter}");
			fireEvent.click(window);
			await waitFor(() =>
				expect((todoInput as HTMLInputElement).value).toEqual("")
			);
		});
	});
	describe("Filter todo Item base on check box", () => {
		test(" Check second todo item then filter all completed todo item", () => {
			const checkboxElement = screen
				.getAllByTestId("todoItem")[1]
				.getElementsByTagName("input")[0];
			const completedFilterButton = screen.getByTestId("completedFilterButton");
			fireEvent.click(checkboxElement);
			fireEvent.click(completedFilterButton);
			expect(screen.getAllByTestId("todoItem").length).toEqual(1);
		});
		test(" Check second todo item then filter all Active todo item", () => {
			const checkboxElement = screen
				.getAllByTestId("todoItem")[1]
				.getElementsByTagName("input")[0];
			const completedFilterButton = screen.getByTestId("activeFilterButton");
			fireEvent.click(checkboxElement);
			fireEvent.click(completedFilterButton);
			expect(screen.getAllByTestId("todoItem").length).toEqual(2);
		});
	});
});
