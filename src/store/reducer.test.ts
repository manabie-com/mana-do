import reducer from "./reducer"
import Service from './../service';
import { createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoStatus } from "./actions";

test("test reducer exist", () => {
    expect(reducer).toBeTruthy()
})

describe("reducer work correctly",  () => {
    it("create todo", async () => {
        let todo = await Service.createTodo("the todo 1")
        let todo2 = await Service.createTodo("the todo 2")
        let listTodo = reducer({ todos: [] }, createTodo(todo))
        expect(reducer(listTodo, createTodo(todo2)).todos).toEqual(
            expect.arrayContaining([todo, todo2]),
        )
    })

    it("update todos", async () => {
        let todo = await Service.createTodo("the todo 1")
        let todo2 = await Service.createTodo("the todo 2")
        let listTodo = reducer({ todos: [] }, createTodo(todo))
        reducer(listTodo, createTodo(todo2))
        expect(reducer(listTodo, updateTodoStatus(todo.id, true)).todos).toEqual(
            expect.arrayContaining([todo]),
        )
    })


    it("delete todo", async () => {
        let todo = await Service.createTodo("the todo 1")
        let todo2 = await Service.createTodo("the todo 2")
        let listTodo = reducer({ todos: [] }, createTodo(todo))
        reducer(listTodo, createTodo(todo2))

        expect(reducer(listTodo, deleteTodo(todo.id)).todos).not.toEqual(
            expect.arrayContaining([todo]),
        )
    })
    
    it("toggleAllTodos", async () => {
        let todo = await Service.createTodo("the todo 1")
        let todo2 = await Service.createTodo("the todo 2")
        let listTodo = reducer({ todos: [] }, createTodo(todo))
        reducer(listTodo, createTodo(todo2))

        todo2.status = 'COMPLETED'
        expect(reducer(listTodo, toggleAllTodos(true)).todos).toEqual(
            expect.arrayContaining([todo2]),
        )
    })

    it("deleteAllTodos", async () => {
        let todo = await Service.createTodo("the todo 1")
        let todo2 = await Service.createTodo("the todo 2")
        let listTodo = reducer({ todos: [] }, createTodo(todo))
        reducer(listTodo, createTodo(todo2))

        expect(reducer(listTodo, deleteAllTodos())).toEqual({todos: []})
    })
})