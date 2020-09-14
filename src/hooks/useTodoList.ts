import { useState, useReducer, useEffect } from 'react';

import TodoAPI from '../api-service/todo.service';
import reducer, { initialState } from '../store/todo/reducer';
import {
    createTodo,
    deleteTodo,
    deleteAllTodos,
    updateTodoStatus,
    updateTodo,
} from '../store/todo/actions';

const useTodoList = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = () => {
    const timerId = setTimeout(() => {
      setLoading(false)
      clearTimeout(timerId);
    }, 1500);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleCreateTodo = async (content: string) => {
    try {
      const newTodo = await TodoAPI.create(content);
      dispatch(createTodo(newTodo));
    } catch (error) {
      throw new Error('Err');
    }
  };
  const handleDeleteAllTodo = async () => {
    try {
      await TodoAPI.deleteAll();
      dispatch(deleteAllTodos());
    } catch (error) {
      throw new Error('Err');
    }
  };
  const handleDeleteTodo = async (todoId: string) => {
    try {
      await TodoAPI.delete(todoId);
      dispatch(deleteTodo(todoId));
    } catch (error) {
      
    }
  };
  const hanldeUpdateTodoStatus = async (todoId: string, checked: boolean) => {
    try {
      dispatch(updateTodoStatus(todoId, checked));
    } catch (error) {
      
    }
  };
  const handleUpdateTodo = async (todoId: string, content: string) => {
    try {
      const todoUpdated = await TodoAPI.edit(todoId, content);
      dispatch(updateTodo(todoId, todoUpdated));
    } catch (error) {
      
    }
  };
  return {
    loading,
    list: todos,
    createTodo: handleCreateTodo,
    deleteAllTodo: handleDeleteAllTodo,
    deleteTodo: handleDeleteTodo,
    updateTodoStatus: hanldeUpdateTodoStatus,
    updateTodo: handleUpdateTodo,
  };
};

export default useTodoList;