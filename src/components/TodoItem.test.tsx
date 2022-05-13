import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import TodoItem, { TodoProps } from "components/TodoItem";
import { TodoStatus } from "models/todo";

describe("TodoItem", () => {
	it("should render without crashing", () => {
		const todo = {
			content: "content",
			created_date: new Date().toISOString(),
			status: TodoStatus.ACTIVE,
			id: "1",
			user_id: "firstUser",
		};
		const screen = render(<TodoItem {...todo} active={false} />);
		expect(screen.getByLabelText("todo-item")).toBeInTheDocument();
	});

	describe("props", function () {
		const todo = {
			content: "content",
			created_date: new Date().toISOString(),
			status: TodoStatus.ACTIVE,
			id: "11",
			user_id: "firstUser",
		};

		describe("active prop is true", () => {
			const onTick = jest.fn();
			const props: TodoProps = {
				...todo,
				active: true,
				onTick,
			};
			let screen: any = "";

			beforeEach(() => {
				screen = render(<TodoItem {...props} />);
			});
			afterEach(cleanup);

			it("onTick prop should correct behaviour and receive correct params", () => {
				const item = screen.getByLabelText("todo-item-checkbox");
				expect(onTick).toHaveBeenCalledTimes(0);

				fireEvent.click(item);
				expect(onTick).toHaveBeenCalledTimes(1);
				expect(onTick).toHaveBeenCalledWith(props.id, !props.active);
			});
		});

		describe("active prop is false", () => {
			const onTick = jest.fn();
			const props: TodoProps = {
				...todo,
				active: false,
				onTick,
			};
			let screen: any = "";

			beforeEach(() => {
				screen = render(<TodoItem {...props} />);
			});
			afterEach(cleanup);

			it("onTick prop should correct behaviour and receive correct params", () => {
				const item = screen.getByLabelText("todo-item-checkbox");
				expect(onTick).toHaveBeenCalledTimes(0);

				fireEvent.click(item);
				expect(onTick).toHaveBeenCalledTimes(1);
				expect(onTick).toHaveBeenCalledWith(props.id, !props.active);
			});
		});

		describe("other props", () => {
			const todo = {
				content: "content",
				created_date: new Date().toISOString(),
				status: TodoStatus.ACTIVE,
				id: "11",
				user_id: "firstUser",
			};
			const onRemove = jest.fn();
			const onDoubleClick = jest.fn();

			const onChangeStatus = jest.fn();
			const props: TodoProps = {
				...todo,
				active: false,
				onChangeStatus,
				onDoubleClick,
				onRemove,
			};
			let screen: any = "";
			beforeEach(() => {
				screen = render(<TodoItem {...props} />);
			});
			afterEach(cleanup);
			it("content prop should render correct", () => {
				const item = screen.getByLabelText("todo-item-content");
				expect(item).toHaveTextContent(todo.content);
			});
			it("active prop should render correct", () => {
				const item = screen.getByLabelText("todo-item-checkbox");
				expect(item.getAttribute("checked")).toBeNull();
			});
			it("onChangeStatus prop should correct behaviour and receive correct params", () => {
				const item = screen.getByLabelText("todo-item-status");
				expect(onChangeStatus).toHaveBeenCalledTimes(0);
				fireEvent.change(item, {
					target: {
						value: TodoStatus.COMPLETED,
					},
				});
				expect(onChangeStatus).toHaveBeenCalledTimes(1);
				expect(onChangeStatus).toHaveBeenCalledWith(
					todo.id,
					TodoStatus.COMPLETED,
				);
			});
			it("onRemove prop should correct behaviour and receive correct params", () => {
				const item = screen.getByLabelText("todo-item-remove");
				expect(onRemove).toHaveBeenCalledTimes(0);
				fireEvent.click(item);
				expect(onRemove).toHaveBeenCalledTimes(1);
				expect(onRemove).toHaveBeenCalledWith(todo.id);
			});
			it("onDoubleClick prop should should correct behaviour and receive correct params", () => {
				const item = screen.getByLabelText("todo-item-dbclick");
				expect(onDoubleClick).toHaveBeenCalledTimes(0);
				fireEvent.doubleClick(item);
				expect(onDoubleClick).toHaveBeenCalledTimes(1);
				expect(onDoubleClick).toHaveBeenCalledWith(todo.id);
			});
		});
	});
});
