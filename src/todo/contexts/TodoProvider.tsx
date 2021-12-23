import { FC, useEffect, useReducer, useState } from "react";
import { TodoStatus } from "../../models/todo";
import Service from "../../service";
import { createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoStatus } from "../../store/actions";
import reducer, { TodoState } from "../../store/reducer";

import { TodoContext } from "./TodoContext";

const INITIAL_TODO_LIST: TodoState = {
    todos: []
}

type EnhanceTodoStatus = TodoStatus | 'ALL';

export const TodoProvider:FC = ({children}) => {
    const [todoList, dispatch] = useReducer(reducer, INITIAL_TODO_LIST);
    const [error, setError] = useState<any>(null);
    if (error) {
        throw error;
      }

    const onUpdateTodoStatus = async(e: boolean, todoId: string) => {
        try {
            const status = e === true ? 'COMPLETED' : 'ACTIVE';
            await Service.updateTodo(todoId, status);
            dispatch(updateTodoStatus(todoId, e))
        } catch (error) {
            setError(error);
        }
        
    }

    const onDeleteAllTodos = async() => {
        const ids: string[] =[];
        todoList.todos.forEach(todo => ids.push(todo.id))
        try {
            await Service.onDeleteAllTodos(ids);
            dispatch(deleteAllTodos());

        } catch (error) {
            setError(error);
        }
       
    }

    const onDeleteTodo = async(id: string) => {
        try {
            await Service.deleteTodo(id);
            dispatch(deleteTodo(id))
        } catch (error) {
            setError(error);
        }
       
    }

    const  onCreateTodo = async(content: string) => {
        const user_id = process.env.USER_ID || '1'
        try {
            const resp = await Service.createTodo(user_id, content);
            dispatch(createTodo(resp));
        } catch (error) {
            alert(error)
            // setError(error);
        }
    }

    const [showingStatus, setShowingStatus] = useState<EnhanceTodoStatus>('ALL');

    const onSetShowingTodo = (status: TodoStatus | 'ALL') => {
        setShowingStatus(status)
    }

    const onToggleAllTodos = async(e: boolean) => {
        const ids: string[] =[];
        todoList.todos.forEach(todo => ids.push(todo.id))
        dispatch(toggleAllTodos(e))
    }

    useEffect(()=>{       
        
        (async ()=>{     
            try {
                const resp = await Service.getTodos();
            
                dispatch(setTodos(resp || []));
            } catch (error) {
                alert(error)
                // setError(error);
                
            }
            
        })()
    }, [])

    return (
        <TodoContext.Provider
            value={{
                todoList,
                showingStatus,
                onUpdateTodoStatus,
                onDeleteTodo,
                onCreateTodo,
                onSetShowingTodo,
                onToggleAllTodos,
                onDeleteAllTodos
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}