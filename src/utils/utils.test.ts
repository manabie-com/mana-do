import shortid from 'shortid';
import { TodoStatus } from 'models/todo';
import { isTodoCompleted, isTodoActive } from '.';

const activeTodo = {
	user_id: 'firstUser',
	content: 'this is the content',
	created_date: new Date().toISOString(),
	status: TodoStatus.ACTIVE,
	id: shortid(),
};

const completedTodo = {
	user_id: 'firstUser',
	content: 'this is the content',
	created_date: new Date().toISOString(),
	status: TodoStatus.COMPLETED,
	id: shortid(),
};

describe('isTodoCompleted', () => {
	it('should not completed with active todo', () => {
		expect(isTodoCompleted(activeTodo)).toEqual(false);
	});

	it('should completed with completed todo', () => {
		expect(isTodoCompleted(completedTodo)).toEqual(true);
	});
});

describe('isTodoActive', () => {
	it('should not active with active todo item', () => {
		expect(isTodoActive(activeTodo)).toEqual(true);
	});

	it('should active with completed todo item', () => {
		expect(isTodoActive(completedTodo)).toEqual(false);
	});
});
