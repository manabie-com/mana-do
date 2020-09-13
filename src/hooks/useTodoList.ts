import { useState, useReducer, useEffect } from 'react';

import TodoAPI from '../api-service/todo.service';
import reducer, { initialState } from '../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from '../store/actions';
import { ITodo } from '../types/todo';

const useTodoList = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {

  }, []);
  const handleCreateTodo = async (content: string) => {
    try {
      const newTodo = await TodoAPI.create(content);
      dispatch(createTodo(newTodo));
    } catch (error) {
      
    }
  };
  return { list: todos, loading, createTodo: handleCreateTodo };
};

export default useTodoList;