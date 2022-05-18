import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import Todo from './Todo';

async function createPage(): Promise<any> {
	let screen: any;
	await act(async () => {
		screen = render(<Todo />);
	});
	return screen;
}

describe('Todo', () => {
	it('should render without crashing', async () => {
		const screen = await createPage();
		expect(screen.getByLabelText('todo-container')).toBeInTheDocument();
	});

	describe('Components render correct', () => {
		let screen: any;
		beforeEach(async () => {
			screen = await createPage();
		});
		afterEach(() => {
			cleanup();
		});

		it('should have a TodoInput', () => {
			const todoInput = screen.getAllByLabelText('todo-input');
			expect(todoInput).toHaveLength(1);
		});
	});
});
