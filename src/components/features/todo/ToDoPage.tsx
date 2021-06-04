import React, {useEffect, useReducer, useRef} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {TodoReducer, initialTodoState} from '../../../store/reducers';
import {
  todoAction
} from '../../../store/actions';
import Service from '../../../service';
import {TodoStatus} from '../../../models/todo';
import ToDoPageView from './ToDoPageView';

const ToDoPage = ({history} : RouteComponentProps) => {
  const [{todos}, dispatch] = useReducer(TodoReducer, initialTodoState);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const authorization = async (token: string) => {
      try {
        await Service.authorize(token);
        const resp = await Service.getTodos();
        dispatch(todoAction.setTodos(resp || []));
      } catch(e) {
        history.push('/');
      }
    }
    authorization(token);
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      if (!inputRef.current.value.trim()) return;
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(todoAction.createTodo(resp));
        inputRef.current.value = '';
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/')
        }
      }
    }
  }

  const onUpdateTodoStatus = async (checked: boolean, todoId: string) => {
    try {
      const resp = await Service.updateTodoStatus(todoId, checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE);
      dispatch(todoAction.updateTodoStatus(resp.id, resp.status));
    } catch (e) {
      if (e.response.status === 401) {
        history.push('/')
      }
    }
  }

  const onUpdateTodoContent = async (content : string, todoId : string) => {
    try {
      const resp = await Service.updateTodoContent(todoId, content);
      dispatch(todoAction.updateTodoContent(resp.id, resp.content));
    } catch (e) {
      if (e.response.status === 401) {
        history.push('/')
      }
    }
  }

  const onToggleAllTodo = async (checked: boolean) => {
    try {
      const resp = await Service.updateAllTodosStatuses(checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE);
      dispatch(todoAction.toggleAllTodos(resp));
    } catch (e) {
      if (e.response.status === 401) {
        history.push('/')
      }
    }
  }

  const onDeleteTodo = async (todoId: string) => {
    try {
      const resp = await Service.deleteTodo(todoId);
      dispatch(todoAction.deleteTodo(resp));
    } catch (e) {
      if (e.response.status === 401) {
        history.push('/')
      }
    }
  }

  const onDeleteAllTodo = async () => {
    try {
      await Service.deleteAllTodos();
      dispatch(todoAction.deleteAllTodos());
    } catch (e) {
      if (e.response.status === 401) {
        history.push('/')
      }
    }
  }

  return (
    <ToDoPageView
      inputRef={inputRef}
      todos={todos}
      onCreateTodo={onCreateTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onUpdateTodoContent={onUpdateTodoContent}
      onDeleteTodo={onDeleteTodo}
      onDeleteAllTodo={onDeleteAllTodo}
      onToggleAllTodo={onToggleAllTodo}
    />
  );
};

export default ToDoPage;
