import shortid from 'shortid';
import { FilterType, Todo, TodoStatus } from 'models/todo';

import reducer, { AppState, initialState } from 'store/reducer';
import { createTodo, updateTodoStatus, updateTodoContent, deleteAllTodos } from 'store/actions';

const todo: Todo = {
	user_id: 'userId1',
	content: 'This is content',
	created_date: new Date().toISOString(),
	status: TodoStatus.ACTIVE,
	id: shortid(),
};

const todoState: AppState = {
	todos: [],
	filter: FilterType.ALL,
};

describe('CREATE_TODO', () => {
	it('should save todo when create', () => {
		const nextState = reducer(initialState, createTodo(todo));
		let data = { ...todoState, todos: [ ...todoState.todos, todo ] };
		expect(nextState.todos.length).toEqual(data.todos.length);
	});
});

describe('UPDATE_TODO_STATUS', () => {
	it('should update todo status', () => {
		const nextState = reducer(initialState, updateTodoStatus(todo.id, TodoStatus.COMPLETED));
		let data = [ { ...todo, status: TodoStatus.COMPLETED } ];

		expect(nextState.todos).toEqual(data);
	});
});

describe('UPDATE_TODO_CONTENT', () => {
	it('should update todo content', () => {
		const updateContent = 'new content';
		const nextState = reducer(initialState, updateTodoContent(todo.id, updateContent));
		let data = [ { ...todo, content: updateContent } ];

		expect(nextState.todos).toEqual(data);
	});
});

describe('DELETE_ALL_TODOS', () => {
	it('should update status todos', () => {
		const nextState = reducer(initialState, deleteAllTodos());
		expect(nextState.todos.length).toEqual(0);
	});
});
