import React, { useEffect, useReducer, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Column from '../../components/Layouts/Column';
import TextWarning from '../../components/Text/TextWarning';
import { TodoFilters } from '../../models/todo';
import Service from '../../service';
import {
  createTodo,
  deleteAllTodos, deleteTodo, setTodos,
  toggleAllTodos,
  updateTodoStatus
} from '../../store/actions';
import reducer, { initialState } from '../../store/reducer';
import FilteredTodoList from './sections/FilteredTodoList';
import TodoActions from './sections/TodoActions';
import TodoFiltersList from './sections/TodoFilters';
import TodoForm from './sections/TodoForm';


const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })()
  }, [])

  const onCreateTodo = async (todo: string) => {
    const resp = await Service.createTodo(todo);
    dispatch(createTodo(resp));
  }
  const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    const checked = e.target.checked;
    await Service.updateTodoStatus(todoId, checked);
    dispatch(updateTodoStatus(todoId, checked));
  }
  const onToggleAllTodo = async (checked: boolean) => {
    await Service.toggleAllTodos(checked);
    dispatch(toggleAllTodos(checked));
  }
  const onDeleteTodo = async (todoId: string) => {
    await Service.deleteTodo(todoId);
    dispatch(deleteTodo(todoId));
  }
  const onDeleteAllTodo = async () => {
    await Service.deleteAllTodos();
    dispatch(deleteAllTodos());
  }

  const [todoFilter, setTodoFilter] = useState<TodoFilters>(TodoFilters.ALL);

  return (
    <Column m={12}>
      <TodoForm onCreateTodo={onCreateTodo} />

      <TodoFiltersList filter={todoFilter} setTodoFilter={setTodoFilter} />

      <TodoActions
        todos={todos}
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
      />
      {todos.length
        ? <FilteredTodoList
          todos={todos}
          filter={todoFilter}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodoStatus={onUpdateTodoStatus}
        />
        : <TextWarning>You do not have any todos yet!</TextWarning>
      }

    </Column>
  );
};

export default ToDoPage;