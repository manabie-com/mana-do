import {IAPI} from "../../service/types";
import {Todo, TodoStatus} from "../../models/todo";
import shortid from "shortid";
import {TODOS_LOCAL_STORAGE_KEY} from "../../constants";

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
}, {
    content: 'fake content 3',
    created_date: new Date().toISOString(),
    status: TodoStatus.COMPLETED,
    id: shortid(),
    user_id: 'userId3'
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
    const todosStr = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
    const todos = todosStr ? JSON.parse(todosStr) as Todo[] : [];
    const newTodo = todos.find(item => item.id === response.id);

    expect(todos.length).toEqual(1);
    expect(newTodo).not.toBeUndefined();
    expect(newTodo?.content).toEqual(content);
});

test('API create todo should keep the existing items', async () => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(fakeExistingTodos));
    const content = 'fake content';
    const response = await Service.createTodo(content);
    const todosStr = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
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
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(fakeExistingTodos));
    const todos = await Service.getTodos();

    expect(todos).toEqual(fakeExistingTodos);
});

test('API update todo status should update the todo status to COMPLETED', async () => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(fakeExistingTodos));
    const todoId = fakeExistingTodos[0].id;

    await Service.updateTodoStatus(todoId, TodoStatus.COMPLETED);

    const todosStr = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
    const todos = todosStr ? JSON.parse(todosStr) as Todo[] : [];
    const todo = todos.find(item => item.id === todoId);

    expect(todo?.status).toEqual(TodoStatus.COMPLETED);
});

test('API update todo status should update the todo status to ACTIVE', async () => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(fakeExistingTodos));
    const todoId = fakeExistingTodos[2].id;

    await Service.updateTodoStatus(todoId, TodoStatus.ACTIVE);

    const todosStr = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
    const todos = todosStr ? JSON.parse(todosStr) as Todo[] : [];
    const todo = todos.find(item => item.id === todoId);

    expect(todo?.status).toEqual(TodoStatus.ACTIVE);
});

test('API toggle all todo should update all todo status to COMPLETED', async () => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(fakeExistingTodos));

    await Service.onToggleAllTodo(true);

    const todosStr = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
    const todos = todosStr ? JSON.parse(todosStr) as Todo[] : [];
    const notCompletedTodoIndex = todos.findIndex(item => item.status !== TodoStatus.COMPLETED);

    expect(notCompletedTodoIndex).toEqual(-1);
});

test('API toggle all todo should update all todo status to ACTIVE', async () => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(fakeExistingTodos));

    await Service.onToggleAllTodo(false);

    const todosStr = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
    const todos = todosStr ? JSON.parse(todosStr) as Todo[] : [];
    const notCompletedTodoIndex = todos.findIndex(item => item.status !== TodoStatus.ACTIVE);

    expect(notCompletedTodoIndex).toEqual(-1);
});

test('API delete all todo should delete all todo', async () => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(fakeExistingTodos));

    await Service.onDeleteAllTodo();
    const todosStr = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);

    expect(todosStr).toBeNull();
});

test('API delete todo by id should delete the selected todo and keep the others', async () => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(fakeExistingTodos));
    const todoIdToDelete = fakeExistingTodos[1].id;

    await Service.onDeleteTodo(todoIdToDelete);

    const expectedTodos = fakeExistingTodos.filter(item => item.id !== todoIdToDelete);
    const todosStr = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
    const todos = todosStr ? JSON.parse(todosStr) as Todo[] : [];

    expect(todos).toEqual(expectedTodos);
});
