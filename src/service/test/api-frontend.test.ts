
import ApiFrontEnd from '../api-frontend';
import { TodoStatus } from '../../models/todo'
import shortid from 'shortid';

test('it should return a token when log in with username = "firstUser" and password="example', async () => {
    const mockToken = 'testabc.xyz.ahk';
    const user = {
        username: 'firstUser',
        password: 'example'
    }
    const token = await ApiFrontEnd.signIn(user.username, user.password);
    expect(token).toBe(mockToken)
});

test('it should return an error when login with wrong username and password', async () => {
    let token, error
    const user = {
        username: 'baby',
        password: 'ladder'
    }

    try {
        const token = await ApiFrontEnd.signIn(user.username, user.password);
    } catch (err) {
        error = err
    }

    expect(token).toBe(undefined)
    expect(error).toBe("Incorrect username/password")
});

describe('create new task, createTodo function', () => {
    test('it should return a new task and update todolist in localstorage', async () => {
        const content = "Buy a garden";
        const newTask = await ApiFrontEnd.createTodo(content);
        const tasks = JSON.parse(localStorage.getItem("todos") || "[]");

        expect(newTask.content).toBe(content);
        expect(newTask.status).toBe(TodoStatus.ACTIVE);
        expect(newTask.user_id).toBe("firstUser");

        expect(Array.isArray(tasks)).toBe(true);
        expect(tasks).toEqual(expect.arrayContaining([
            expect.objectContaining(newTask)
        ]))
    })
})

describe('get data, getTodo function', () => {
    test('it should return an array of todo', async () => {
        const tasks = await ApiFrontEnd.getTodos();
        expect(Array.isArray(tasks)).toBe(true);
    })
})

describe('update task, updateTodo function', () => {
    test('it should update task status and update todolist in localstorage', async () => {
        const newStatus = TodoStatus.COMPLETED;
        const content = "Buy a dog";
        const newTask = await ApiFrontEnd.createTodo(content);
        newTask.status = newStatus;

        const updatedTask = await ApiFrontEnd.updateTodo(newTask);

        const tasks = JSON.parse(localStorage.getItem("todos") || "[]");

        expect(updatedTask).toBe(newTask);

        expect(Array.isArray(tasks)).toBe(true);
        expect(tasks).toEqual(expect.arrayContaining([
            expect.objectContaining(updatedTask)
        ]))
    })

    test('it should update task content', async () => {
        const newContent = "dig a hole";
        const content = "Buy a tree";
        const newTask = await ApiFrontEnd.createTodo(content);
        newTask.content = newContent;

        const updatedTask = await ApiFrontEnd.updateTodo(newTask);

        expect(updatedTask).toBe(newTask)
    })

    test('it can not update an unexisting task', async () => {
        const newTask = {
            content: "meo meo",
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: "1223",
            user_id: 'firstUser'
        };

        await ApiFrontEnd.updateTodo(newTask);
        const tasks = JSON.parse(localStorage.getItem("todos") || "[]");

        expect(tasks).not.toEqual(expect.arrayContaining([
            expect.objectContaining(newTask)
        ]))
    })
})

describe('toggleAllTodo function', () => {
    test('it should toggle status of all todos', async () => {
        const checked = true;

        const todos = await ApiFrontEnd.toggleAllTodo(checked);

        const result = todos.every(todo => todo.status === TodoStatus.COMPLETED);

        expect(result).toBe(true)
    })
})

describe('deleteAllTodo function', () => {
    test('it should delete todo list', async () => {
        const result = await ApiFrontEnd.deleteAllTodo();

        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(0);
    })
})

describe('deleteTodo function', () => {
    it('should delete a task', async () => {
        const content = "Paint house";
        const newTask = await ApiFrontEnd.createTodo(content);

        const tasks = await ApiFrontEnd.deleteTodo(newTask.id);
        
        expect(Array.isArray(tasks)).toBe(true);
        expect(tasks).not.toEqual(expect.arrayContaining([
            expect.objectContaining(newTask)
        ]))
    })
})
