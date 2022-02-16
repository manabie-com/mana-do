import React, { useEffect, useReducer } from 'react';

import reducer, { initialState } from '../store/reducer';
import { 
  createTodo,
  deleteTodo, 
  setTodos, 
  setStatus, 
  updateTodoContent, 
  updateTodoStatus, 
  toggleAllTodos, 
  deleteAllTodos 
} from '../store/actions';
import Service from '../service';
import { InputCreate } from './InputCreate'
import { List } from './List';
import { FilterByStatus } from './FilterByStatus';
import apiFrontend from '../service/api-frontend';

const ToDoPage = () => {
  const [{ todos, status }, dispatch] = useReducer(reducer, initialState);

  const onCreateTodo = (data: any) => {
    dispatch(createTodo(data));
  }

  const setToDoStatus = (status: any) => {
    dispatch(setStatus(status));
  }

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  }

  const onDeleteAll = () => {
    dispatch(deleteAllTodos());
  }

  const onEditTodo = (id: string, content: string) => {
    dispatch(updateTodoContent(id, content));
  }

  const onUpdateTodoStatus = (id: string, checked: boolean) => {
    dispatch(updateTodoStatus(id, checked));
  }

  const onToggleAll = (checked: boolean) => {
    dispatch(toggleAllTodos(checked));
  }

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(()=> {
    apiFrontend.setItem(todos)
  }, [todos])

  return (
    <div className="ToDo__container">
      <InputCreate onCreate={onCreateTodo}/>
      <List
        todos={todos}
        onRemove={onDeleteTodo}
        onEdit={onEditTodo}
        onUpdateStatus={onUpdateTodoStatus}
        status={status}
      />
      <FilterByStatus
        todos={todos}
        setStatus={setToDoStatus}
        onToggleAll={onToggleAll}
        onDeleteAll={onDeleteAll}
      />
    </div>
  );
};

export default ToDoPage;
