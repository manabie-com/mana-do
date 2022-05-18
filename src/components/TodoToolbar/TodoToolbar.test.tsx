import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TodoToolbar from './TodoToolbar';
import { FilterType, TodoStatus } from 'models/todo';

describe('TodoToolbar', () => {
	const props = {
		status: TodoStatus.ACTIVE,
		onChangeStatus: jest.fn(),
		onDeleteAllTodo: jest.fn(),
		onChangeFilter: jest.fn(),
		filter: FilterType.ALL,
		itemsLeftCount: 2,
	};

	it('should render without crashing', async () => {
		const screen = render(<TodoToolbar {...props} />);
		expect(screen.getByLabelText('todo-toolbar')).toBeInTheDocument();
	});

	describe('props', () => {
		let screen: any;

		beforeEach(async () => {
			screen = render(<TodoToolbar {...props} />);
		});
		afterEach(() => {
			cleanup();
		});

		it('should have a filter active button', () => {
			const todoForm = screen.getAllByLabelText('todo-toolbar-filter-active');
			expect(todoForm).toHaveLength(1);
		});

		it('should have a filter all button', () => {
			const button = screen.getAllByLabelText('todo-toolbar-filter-all');
			expect(button).toHaveLength(1);
		});

		it('should have a filter completed button', () => {
			const button = screen.getAllByLabelText('todo-toolbar-filter-completed');
			expect(button).toHaveLength(1);
		});
	});
});
