import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import TodoStatusDropDown from "components/TodoStatusDropDown";
import { TodoStatus } from "models/todo";

describe("TodoStatusDropDown", () => {
	it("should render without crashing", () => {
		const props = {
			status: TodoStatus.ACTIVE,
			onChangeStatus: jest.fn(),
		};
		const screen = render(<TodoStatusDropDown {...props} />);
		expect(screen.getByLabelText("todo-item-status")).toBeInTheDocument();
	});
	describe("props", function () {
		const onChangeStatus = jest.fn();
		const props = {
			status: TodoStatus.ACTIVE,
			onChangeStatus,
		};
		let screen: any;

		beforeEach(() => {
			screen = render(<TodoStatusDropDown {...props} />);
		});
		afterEach(cleanup);

		it("status prop should correct", () => {
			const item = screen.getByText(TodoStatus.ACTIVE);
			expect((item as HTMLOptionElement).selected).toBeTruthy();
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
			expect(onChangeStatus).toHaveBeenCalledWith(TodoStatus.COMPLETED);
		});
	});
});
