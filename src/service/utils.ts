import {Todo, TodoStatus} from "../models/todo";

export interface TResponse {
    status: Number,
    code: string,
    data?: any
}

export const updateTodoService = async (todoId:string, content: string): Promise<TResponse> => {

    const dataListTodo:any = await localStorage.getItem('todolist') || '[]';

    const dataToAPI = await JSON.parse(dataListTodo) as Todo[]

    const index = dataToAPI.findIndex(todo => todo.id === todoId)

    dataToAPI[index].content = content

    await localStorage.setItem('todolist', JSON.stringify(dataToAPI))

    return {status: 200, code: "success"}

}

export const removeTodoService = async (todoId: string): Promise<TResponse> => {
    const dataListTodo:any = await localStorage.getItem('todolist') || '[]';

    const dataToAPI = await JSON.parse(dataListTodo) as Todo[]

    const index = dataToAPI.findIndex(todo => todo.id === todoId)

    dataToAPI.splice(index, 1)

    await localStorage.setItem('todolist', JSON.stringify(dataToAPI))

    return {status: 200, code: "success"}

}

export const updateStatusTodoService = async (todoId:string, status: TodoStatus): Promise<TResponse> => {

    const dataListTodo:any = await localStorage.getItem('todolist') || '[]';

    const dataToAPI = await JSON.parse(dataListTodo) as Todo[]

    const index = dataToAPI.findIndex(todo => todo.id === todoId)

    dataToAPI[index].status = status

    await localStorage.setItem('todolist', JSON.stringify(dataToAPI))

    return {status: 200, code: "success"}

}