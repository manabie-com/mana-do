import { Todo, TodoStatus } from "src/redux/types"
import mockTodo from "src/mock/todo.json"
import { v4 } from "uuid"
import moment from "moment"

export const getTodosAPI = async (): Promise<Todo[] | undefined> => {
    try {
        return mockTodo as Todo[]
    } catch (err) {
        console.log(err)
    }
}


export const createTodoAPI = async (data: Partial<Todo>, userId: string): Promise<Todo | undefined> => {
    try {
        const newData: Partial<Todo> = { ...data, id: v4(), created_date: String(moment().format()), status: TodoStatus.ACTIVE, user_id: userId }
        return newData as Todo
    } catch (err) {
        console.log(err)
    }
}