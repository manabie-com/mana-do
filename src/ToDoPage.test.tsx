import React from "react";
import {
	render,
	fireEvent,
	cleanup,
	within,
	act,
	waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToDoPage from "ToDoPage";
import { TodoStatus } from "models/todo";

async function createPage(): Promise<any> {
	let screen: any;
	await act(async () => {
		screen = render(<ToDoPage />);
	});
	return screen;
}

describe("ToDoPage", () => {
	it("should render without crashing", async () => {
		const screen = await createPage();
		expect(screen.getByLabelText("todo-page")).toBeInTheDocument();
	});

	describe("Componets render correct", () => {
		let screen: any;
		beforeEach(async () => {
			screen = await createPage();
		});
		afterEach(() => {
			cleanup();
		});

		it("should have a TodoForm", () => {
			const todoForm = screen.getAllByLabelText("todo-form");
			expect(todoForm).toHaveLength(1);
		});
		it("should have a filter all button", () => {
			const button = screen.getAllByLabelText("todo-page-filter-all");
			expect(button).toHaveLength(1);
		});
		it("should have a filter active button", () => {
			const button = screen.getAllByLabelText("todo-page-filter-active");
			expect(button).toHaveLength(1);
		});
		it("should have a filter completed button", () => {
			const button = screen.getAllByLabelText(
				"todo-page-filter-completed",
			);
			expect(button).toHaveLength(1);
		});
		it("should have a delete button", () => {
			const button = screen.getAllByLabelText("todo-page-delete");
			expect(button).toHaveLength(1);
		});
		it("should'n have todo item", () => {
			const items = screen.queryAllByLabelText("todo-item");
			expect(items).toHaveLength(0);
		});
		it("should'n have edit form", () => {
			const items = screen.queryAllByLabelText("edit-todo-form");
			expect(items).toHaveLength(0);
		});
	});

	describe("Features", () => {
		afterEach(() => {
			cleanup();
			localStorage.clear();
		});

		describe("Create Todo", () => {
			let screen: any;
			beforeEach(async () => {
				screen = await createPage();
			});

			it("Create 3 Todo items", async () => {
				const todoForm = screen.getByLabelText("todo-form");
				const input = within(todoForm).getByLabelText(
					"todo-form-input-content",
				);

				// create item 1
				await userEvent.clear(input);
				await userEvent.type(input, "item 1");
				await userEvent.keyboard("{Enter}");

				// create item 2
				await userEvent.clear(input);
				await userEvent.type(input, "item 2");
				await userEvent.keyboard("{Enter}");

				// create item 3
				await userEvent.clear(input);
				await userEvent.type(input, "item 3");
				await userEvent.keyboard("{Enter}");

				const items = screen.queryAllByLabelText("todo-item");
				expect(items).toHaveLength(3);
			});
		});

		describe("delete", () => {
			let screen: any;
			beforeEach(async () => {
				screen = await createPage();
			});
			it("delete single item", async () => {
				const todoForm = screen.getByLabelText("todo-form");
				const input = within(todoForm).getByLabelText(
					"todo-form-input-content",
				);

				// create item 1
				await userEvent.clear(input);
				await userEvent.type(input, "item 1");
				await userEvent.keyboard("{Enter}");

				// create item 2
				await userEvent.clear(input);
				await userEvent.type(input, "item 2");
				await userEvent.keyboard("{Enter}");

				// create item 3
				await userEvent.clear(input);
				await userEvent.type(input, "item 3");
				await userEvent.keyboard("{Enter}");

				const items = screen.queryAllByLabelText("todo-item");

				// change status of first item to Complete
				const item1BtnDelete = within(items[0]).getByLabelText(
					"todo-item-remove",
				);

				await userEvent.click(item1BtnDelete);

				const itemsAfterDelete =
					screen.queryAllByLabelText("todo-item");
				expect(itemsAfterDelete).toHaveLength(2);
			});

			it("delete multiple items", async () => {
				const todoForm = screen.getByLabelText("todo-form");
				const input = within(todoForm).getByLabelText(
					"todo-form-input-content",
				);
				const btnDeleteAll = screen.getByLabelText("todo-page-delete");

				// create item 1
				await userEvent.clear(input);
				await userEvent.type(input, "item 1");
				await userEvent.keyboard("{Enter}");

				// create item 2
				await userEvent.clear(input);
				await userEvent.type(input, "item 2");
				await userEvent.keyboard("{Enter}");

				// create item 3
				await userEvent.clear(input);
				await userEvent.type(input, "item 3");
				await userEvent.keyboard("{Enter}");

				const items = screen.queryAllByLabelText("todo-item");

				// change status of first item to Complete
				const item1Checkbox = within(items[0]).getByLabelText(
					"todo-item-checkbox",
				);
				const item2Checkbox = within(items[1]).getByLabelText(
					"todo-item-checkbox",
				);

				await userEvent.click(item1Checkbox);
				await userEvent.click(item2Checkbox);
				await userEvent.click(btnDeleteAll);

				const itemsAfterDelete =
					screen.queryAllByLabelText("todo-item");

				expect(itemsAfterDelete).toHaveLength(1);
			});

			it("delete all items", async () => {
				const todoForm = screen.getByLabelText("todo-form");
				const input = within(todoForm).getByLabelText(
					"todo-form-input-content",
				);
				const btnDeleteAll = screen.getByLabelText("todo-page-delete");

				// create item 1
				await userEvent.clear(input);
				await userEvent.type(input, "item 1");
				await userEvent.keyboard("{Enter}");

				// create item 2
				await userEvent.clear(input);
				await userEvent.type(input, "item 2");
				await userEvent.keyboard("{Enter}");

				// create item 3
				await userEvent.clear(input);
				await userEvent.type(input, "item 3");
				await userEvent.keyboard("{Enter}");

				await userEvent.click(btnDeleteAll);

				const itemsAfterDelete =
					screen.queryAllByLabelText("todo-item");

				expect(itemsAfterDelete).toHaveLength(0);
			});
		});

		describe("filter", () => {
			let screen: any;
			beforeEach(async () => {
				screen = await createPage();
			});
			it("filter by status", async () => {
				const todoForm = screen.getByLabelText("todo-form");
				const input = within(todoForm).getByLabelText(
					"todo-form-input-content",
				);
				const btnAll = screen.getByLabelText("todo-page-filter-all");
				const btnComplete = screen.getByLabelText(
					"todo-page-filter-completed",
				);
				const btnActive = screen.getByLabelText(
					"todo-page-filter-active",
				);

				// create item 1
				await userEvent.clear(input);
				await userEvent.type(input, "item 1");
				await userEvent.keyboard("{Enter}");

				// create item 2
				await userEvent.clear(input);
				await userEvent.type(input, "item 2");
				await userEvent.keyboard("{Enter}");

				// create item 3
				await userEvent.clear(input);
				await userEvent.type(input, "item 3");
				await userEvent.keyboard("{Enter}");

				const items = screen.queryAllByLabelText("todo-item");

				// change status of first item to Complete
				const item1Status = within(items[1]).getByLabelText(
					"todo-item-status",
				);

				await userEvent.selectOptions(item1Status, [
					TodoStatus.COMPLETED,
				]);

				// filter by COMPLETE status
				await userEvent.click(btnComplete);
				const itemsFilterByComplete =
					screen.queryAllByLabelText("todo-item");
				expect(itemsFilterByComplete).toHaveLength(1);

				// filter by ACTIVE status
				await userEvent.click(btnActive);
				const itemsFilterByActive =
					screen.queryAllByLabelText("todo-item");
				expect(itemsFilterByActive).toHaveLength(2);

				// filer by ALL status
				await userEvent.click(btnAll);
				const itemsFilterByAll =
					screen.queryAllByLabelText("todo-item");
				expect(itemsFilterByAll).toHaveLength(3);
			});
		});

		describe("Edit item", () => {
			let screen: any;
			beforeEach(async () => {
				screen = await createPage();
			});

			it("Edit First Item", async () => {
				const todoForm = screen.getByLabelText("todo-form");
				const input = within(todoForm).getByLabelText(
					"todo-form-input-content",
				);

				// create item 1
				await userEvent.clear(input);
				await userEvent.type(input, "item 1");
				await userEvent.keyboard("{Enter}");

				// create item 2
				await userEvent.clear(input);
				await userEvent.type(input, "item 2");
				await userEvent.keyboard("{Enter}");

				// create item 3
				await userEvent.clear(input);
				await userEvent.type(input, "item 3");
				await userEvent.keyboard("{Enter}");

				const items = screen.queryAllByLabelText("todo-item");

				// change status of first item to Complete
				const item1 = within(items[0]).getByLabelText(
					"todo-item-dbclick",
				);
				await userEvent.dblClick(item1);

				let editTodoForm: any;
				editTodoForm = await waitFor(() =>
					screen.getByLabelText("edit-todo-form"),
				);

				const inputEdit = within(editTodoForm).getByLabelText(
					"todo-form-input-content",
				);
				await userEvent.clear(inputEdit);
				await userEvent.type(inputEdit, "item 1 after change");
				await userEvent.keyboard("{Enter}");

				const itemsAfterChange =
					screen.queryAllByLabelText("todo-item");
				const item1ContentAfterChange = within(
					itemsAfterChange[0],
				).getByLabelText("todo-item-content");

				expect(item1ContentAfterChange).toHaveTextContent(
					"item 1 after change",
				);
			});
		});
	});
});
