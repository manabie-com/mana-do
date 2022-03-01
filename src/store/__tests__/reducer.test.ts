import reducer, { AppState, initialState } from "../reducer"
import Service from '../../service';
import { createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoContent, updateTodoStatus } from "../actions";

const state : AppState = initialState

describe("reducer work correctly", () => {
    it("set todo", async () => {
        const todo = await Service.createTodo("the todo 1")
        const action = setTodos([todo]);
        const newState = reducer(state, action);

        expect(newState).toEqual(
            expect.arrayContaining([todo]),
        )
    })

    // it("create todo", async () => {
    //     let todo = await Service.createTodo("the todo 1")
    //     expect(reducer(initialState, createTodo(todo)).todos).toEqual(
    //         expect.arrayContaining([todo]),
    //     )
    // })

    // it("update todos status", async () => {
    //     let todo = await Service.createTodo("the todo 1")
    //     let todo2 = await Service.createTodo("the todo 2")
    //     let listTodo = reducer({ todos: [] }, createTodo(todo))
    //     reducer(listTodo, createTodo(todo2))
    //     expect(reducer(listTodo, updateTodoStatus(todo.id, true)).todos).toEqual(
    //         expect.arrayContaining([todo]),
    //     )
    // })

    // it("update todos content", async () => {
    //     let todo = await Service.createTodo("the todo 1")
    //     let todo2 = await Service.createTodo("the todo 2")
    //     let listTodo = reducer({ todos: [] }, createTodo(todo))
    //     reducer(listTodo, createTodo(todo2))
    //     expect(reducer(listTodo, updateTodoContent(todo.id, "new content")).todos).toEqual(
    //         expect.arrayContaining([todo]),
    //     )
    // })


    // it("delete todo", async () => {
    //     let todo = await Service.createTodo("the todo 1")
    //     let todo2 = await Service.createTodo("the todo 2")
    //     let listTodo = reducer({ todos: [] }, createTodo(todo))
    //     reducer(listTodo, createTodo(todo2))

    //     expect(reducer(listTodo, deleteTodo(todo.id)).todos).not.toEqual(
    //         expect.arrayContaining([todo]),
    //     )
    // })

    // it("toggleAllTodos", async () => {
    //     let todo = await Service.createTodo("the todo 1")
    //     let todo2 = await Service.createTodo("the todo 2")
    //     let listTodo = reducer({ todos: [] }, createTodo(todo))
    //     reducer(listTodo, createTodo(todo2))

    //     expect(reducer(listTodo, toggleAllTodos(true)).todos).toEqual(
    //         expect.arrayContaining([todo2]),
    //     )
    // })

    // it("deleteAllTodos", async () => {
    //     let todo = await Service.createTodo("the todo 1")
    //     let todo2 = await Service.createTodo("the todo 2")
    //     let listTodo = reducer({ todos: [] }, createTodo(todo))
    //     reducer(listTodo, createTodo(todo2))

    //     expect(reducer(listTodo, deleteAllTodos())).toEqual({ todos: [] })
    // })
})