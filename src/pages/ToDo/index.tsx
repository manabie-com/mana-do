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

  const dispatchUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const dispatchToggleAllTodo = (status: boolean) => {
    dispatch(toggleAllTodos(status))
  }

  const dispatchDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId))
  }
  const dispatchDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  }

  // Lifted states
  const [todoFilter, setTodoFilter] = useState<TodoFilters>(TodoFilters.ALL);

  return (
    <Column m={12}>
      <TodoForm onSuccess={todo => dispatch(createTodo(todo))} />

      <TodoFiltersList filter={todoFilter} setTodoFilter={setTodoFilter} />

      {todos.length
        ? <FilteredTodoList
          todos={todos}
          filter={todoFilter}
          onDeleteTodo={dispatchDeleteTodo}
          onUpdateTodoStatus={dispatchUpdateTodoStatus}
        />
        : <TextWarning>You do not have any todos yet!</TextWarning>
      }

      <TodoActions
        todos={todos}
        onDeleteAllTodo={dispatchDeleteAllTodo}
        onToggleAllTodo={dispatchToggleAllTodo}
      />
    </Column>
  );
};

export default ToDoPage;