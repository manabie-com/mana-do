import { AxiosError } from "axios";
import Service from ".";
import { Todo } from "../models/todo";

// implement todo service to handle actions between FE and BE
class ToDoService {
    createTodo = async (content: string): Promise<Todo | AxiosError> => {
        const result = await Service.createTodo(content)
            .then(res => res)
            .catch((e: AxiosError) => e);
        return result;
    }

    getTodos = async (): Promise<Todo[]> => {
        let result: Todo[] = [];
        const response = await Service.getTodos();
        if (response?.length) {
            result = response;
        } else {
            // handle error
        }
        return result;
    };

    deleteTodo = async (id: string): Promise<boolean> => {
        const response = await Service.deleteTodo(id);
        if (!response) {
            // Handle error
        }
        return response
    };

    deleteAllTodo = async (): Promise<boolean> => {
        const response = await Service.deleteAllTodo();
        if (!response) {
            // Handle error
        }
        return response
    }

    updateTodoStatus = async (id: string, checked: boolean): Promise<boolean> => {
        const response = await Service.updateTodoStatus(id, checked);
        if (!response) {
            // Handle error
        }
        return response
    }

    toggleAllTodo = async (checked: boolean): Promise<boolean> => {
        const response = await Service.toggleAllTodo(checked);
        if (!response) {
            // Handle error
        }
        return response;
    };

    updateTodo = async (id: string, content: string): Promise<boolean> => {
        const response = await Service.updateTodo(id, content);
        if (!response) {
            // Handle error
        }
        return response;
    }
}

export default new ToDoService();