import {IAPI} from "../../service/types";
import {Todo, TodoStatus} from "../../models/todo";
import shortid from "shortid";

const Service = require('../../service/api-frontend').default as IAPI

const fakeExistingTodos: Todo[] = [{
    content: 'fake content 1',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'userId1'
}, {
    content: 'fake content 2',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'userId2'
}];

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    localStorage.clear();
});

test('API create todo should return the new todo', async () => {
    const content = 'fake content';
    const response = await Service.createTodo(content);

    expect(response.content).toEqual(content);
});

test('API create todo should save a new todo in localStorage', async () => {
    const content = 'fake content';
    const response = await Service.createTodo(content);
    const todosStr = localStorage.getItem('todos');
    const todos = todosStr ? JSON.parse(todosStr) as Todo[] : [];
    const newTodo = todos.find(item => item.id === response.id);

    expect(todos.length).toEqual(1);
    expect(newTodo).not.toBeUndefined();
    expect(newTodo?.content).toEqual(content);
});

test('API create todo should keep the existing items', async () => {
    localStorage.setItem('todos', JSON.stringify(fakeExistingTodos));
    const content = 'fake content';
    const response = await Service.createTodo(content);
    const todosStr = localStorage.getItem('todos');
    const todos = todosStr ? JSON.parse(todosStr) as Todo[] : [];

    // the new item should be added to the beginning of the list
    expect(todos[0]).toEqual(response);
    // existing items should be kept
    expect(todos.slice(1)).toEqual(fakeExistingTodos);
});

test('API get todos should return an empty list', async() => {
    const todos = await Service.getTodos();

    expect(todos).toEqual([]);
});

test('API get todos should return todo list', async () => {
    localStorage.setItem('todos', JSON.stringify(fakeExistingTodos));
    const todos = await Service.getTodos();

    expect(todos).toEqual(fakeExistingTodos);
});
