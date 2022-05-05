/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, queryByAttribute, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import TodoItem from "../index";

describe("<TodoItem />", () => {
	const todoItemProps = {
		todoItem: {
			content: "content",
			created_date: "string",
			status: "string",
			id: "string",
			user_id: "string",
		},
		onUpdateTodoStatus: () => {},
		onEditTodoItem: () => {},
		onDeleteTodo: () => {},
		showing: "string",
		id: "test",
	};
	test("It should render todo item", () => {
		const dom = render(<TodoItem {...todoItemProps} />);
		const getById = queryByAttribute.bind(null, "id");
		const todoItemWrapper = getById(dom.container, "test");
		const content = dom.container.getElementsByTagName("span")[0];
		expect(todoItemWrapper).toBeInTheDocument();
		expect(content).toHaveTextContent("content");
	});
	test("Call onUpdateTodoStatus when click checkbox", () => {
		const onUpdateTodoStatus = jest.fn();
		const newTodoItemProps = { ...todoItemProps, onUpdateTodoStatus };
		const dom = render(<TodoItem {...newTodoItemProps} />);
		const checkbox = dom.container.getElementsByTagName("input")[0];
		fireEvent.click(checkbox);
		expect(onUpdateTodoStatus).toHaveBeenCalledTimes(1);
	});
	test("Call onEditTodoItem when click todoItemWrapper", () => {
		const onEditTodoItem = jest.fn();
		const newTodoItemProps = { ...todoItemProps, onEditTodoItem };
		const dom = render(<TodoItem {...newTodoItemProps} />);
		const todoItemWrapper = dom.container.getElementsByTagName("div")[0];
		fireEvent.dblClick(todoItemWrapper);
		expect(onEditTodoItem).toHaveBeenCalledTimes(1);
	});
	test("Call onDeleteTodo when click X", () => {
		const onDeleteTodo = jest.fn();
		const newTodoItemProps = { ...todoItemProps, onDeleteTodo };
		const dom = render(<TodoItem {...newTodoItemProps} />);
		const todoItemWrapper = dom.container.getElementsByTagName("button")[0];
		fireEvent.click(todoItemWrapper);
		expect(onDeleteTodo).toHaveBeenCalledTimes(1);
	});
});
