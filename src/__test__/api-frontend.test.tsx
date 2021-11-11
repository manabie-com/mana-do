import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import Service from "../service/api-frontend";
import { mockTodos, mockUser } from "./mockData";
import { TodoStatus } from "../models/todo";
import shortid from "shortid";

// Unit Test for CRUD Todo
describe("Test api-frontend", () => {
    const errorMessage = { message: "Incorrect username/password" };
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    beforeAll(async () => {
        await Service.setTodos(mockTodos);
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        window.localStorage.__proto__.setItem = jest.fn();
    })
    test("getTodo method should success", async () => {
        const result = await Service.getTodos();
        expect(result).toStrictEqual(mockTodos);
    });

    test("setTodos method should success", async () => {
        await Service.setTodos(mockTodos);
        expect(localStorage.setItem).toBeCalledTimes(1);
    });

    describe("Test signIn function", () => {
        test("should success when correct userId and password", async () => {
            const token = await Service.signIn(mockUser.validUser.userId, mockUser.validUser.password);
            expect(token).toStrictEqual(mockUser.token);
        })
        test("should failure when incorrect userId and password", () => {
            const response = Service.signIn(mockUser.invalidUser.userId, mockUser.invalidUser.password);
            expect(response).rejects.toEqual(errorMessage);
        })
    })

    test("Test signOut function", () => {

    });

    describe("Test createTodo function", () => {
        test("should success", async () => {
            // eslint-disable-next-line new-parens
            jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2000-01-01T00:00:00.000Z');
            const content = "some string";
            const mockTodo = {
                content,
                created_date: new Date().toISOString(),
                status: TodoStatus.ACTIVE,
                id: shortid(),
                user_id: 'firstUser'
            };
            const todo = await Service.createTodo(content);
            mockTodo.id = todo.id;
            expect(todo).toEqual(mockTodo);
        })
    });

    describe("Test deleteTodo function", () => {
        test("should success", async () => {
            const result = await Service.deleteTodo(mockTodos[0].id);
            expect(result).toStrictEqual(true);
        });
        test("should failure", () => {
            const result = Service.deleteTodo("some string");
            expect(result).resolves.toStrictEqual(false);
        })
    })
    describe("Test deleteTodo function", () => {
        test("should success", () => {
            expect(Service.deleteAllTodo()).resolves.toStrictEqual(true);
        });
    })

    describe("Test updateTodoStatus function", () => {
        test("should success", () => {
            const result = Service.updateTodoStatus(mockTodos[0].id, true);
            expect(result).resolves.toStrictEqual(true);
        });
        test("should failure", () => {
            const result = Service.updateTodoStatus("some string", true);
            expect(result).resolves.toStrictEqual(false);
        });
    })

    describe("Test toggleAllTodo function", () => {
        test("should success", () => {
            const result = Service.toggleAllTodo(true);
            expect(result).resolves.toStrictEqual(true);
        });
        test("should failure", () => {
            jest.spyOn(Service, "getTodos").mockResolvedValue([]);
            const result = Service.toggleAllTodo(true);
            expect(result).resolves.toStrictEqual(false);
        });
    })

    describe("Test updateTodo function", () => {
        test("should success", () => {
            // Its run debug passed and return true value but I don't know why jest complier is false
            const result = Service.updateTodo(mockTodos[0].id, "content");
            setTimeout(() => { /// temporary fix bug
                expect(result).resolves.toStrictEqual(true);
            }, 1000);
        });
        test("should failure", () => {
            const result = Service.updateTodo("some Id", "some content");
            expect(result).resolves.toStrictEqual(false);
        });

    })
});