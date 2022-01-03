import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
	it('renders without crashing', () => {
		const { queryByTestId } = render(<App />);
		const appElement = queryByTestId('app');
		expect(appElement).toBeInTheDocument();
	});

	it('renders ToDoPage', () => {
		const { queryByTestId } = render(<App />);
		const toDoPageElement = queryByTestId('todo-page');
		expect(toDoPageElement).toBeInTheDocument();
	});
});
