import {ITodoService} from './types';
import {Todo, TodoStatus} from '../../models/todo';
import shortid from 'shortid';
import { ApiResponseType } from '../types';


class TodoService extends ITodoService {

    createTodo = async (content: string): Promise<ApiResponseType<Todo>> => {
        let todosJson = localStorage.getItem('todos')
        let todos = (todosJson ? JSON.parse(todosJson) : []) as Todo[]
        let existedTodo = todos.find(i => i.content === content)
        if (existedTodo) {
            return Promise.resolve({
                data: {} as Todo,
                statusCode: 401,
                message: "Todo item's already existed"
            })
        }

        return Promise.resolve({
            data: {
                content: content,
                created_date: new Date().toISOString(),
                status: TodoStatus.ACTIVE,
                id: shortid(),
                user_id: 'firstUser'
            } as Todo,
            statusCode: 200,
            message: "success"
        });
    }

    updateTodo = async (id: string, content: string): Promise<ApiResponseType<Todo>> => {
        let todosJson = localStorage.getItem('todos')
        let todos = (todosJson ? JSON.parse(todosJson) : []) as Todo[]
        let sameContentItem = todos.find(i => i.content === content)
        if (sameContentItem) {
            return Promise.resolve({
                data: {} as Todo,
                statusCode: 400,
                message: "Todo item's already existed"
            }); 
        }
        let existedTodo = todos.find(i => i.id === id)
        let updateItem = {...existedTodo, content: content}
        return Promise.resolve({
            data: updateItem as Todo,
            statusCode: 200,
            message: 'success'
        });
    }

    getTodos = async (): Promise<ApiResponseType<Todo[]>> => {
        let todosJson = localStorage.getItem('todos')
        return Promise.resolve({
            data: todosJson ? JSON.parse(todosJson) : [],
            statusCode: 200,
            message: "success"
        })
    }
}

export default new TodoService();