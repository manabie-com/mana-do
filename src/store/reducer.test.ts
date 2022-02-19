import reducer from "./reducer"
import Service from './../service';
import { createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoStatus } from "./actions";


test("test reducer exist", () => {
    expect(reducer).toBeTruthy()
})

test("reducer work correctly", async () => {
    let todo = await Service.createTodo("the todo 1")
    let todo2 = await Service.createTodo("the todo 2")
    let listTodo = reducer({ todos: [] }, createTodo(todo))
    reducer(listTodo, createTodo(todo2))

    expect(listTodo.todos).toEqual(
        expect.arrayContaining([todo, todo2]),
    )
    
    listTodo = reducer(listTodo, updateTodoStatus(todo.id, true))
    expect(listTodo.todos).toEqual(
        expect.arrayContaining([todo]),
    )
    
    listTodo = reducer(listTodo, deleteTodo(todo.id))
    expect(listTodo.todos).not.toEqual(
        expect.arrayContaining([todo]),
    )

    todo2.status = 'COMPLETED'
    expect(reducer(listTodo, toggleAllTodos(true)).todos).toEqual(
        expect.arrayContaining([todo2]),
    )

    expect(reducer(listTodo, deleteAllTodos())).toEqual({todos: []})
})