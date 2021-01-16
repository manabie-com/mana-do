import React, { useEffect, useReducer, useState } from 'react';
import Column from '../../components/Layouts/Column';
import Container from '../../components/Layouts/Container';
import TextWarning from '../../components/Text/TextWarning';
import { TodoFilters } from '../../models/todo';
import Service from '../../service';
import FilteredTodoList from './sections/FilteredTodoList';
import TodoActions from './sections/TodoActions';
import TodoFiltersList from './sections/TodoFilters';
import TodoForm from './sections/TodoForm';
import {
  createTodo,
  deleteAllTodos, deleteTodo, setTodos,
  toggleAllTodos,
  updateTodo,
  updateTodoStatus
} from './store/actions';
import reducer, { initialState } from './store/reducer';


const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const resp = await Service.getTodos();
      if (mounted) dispatch(setTodos(resp || []));
    })();
    return () => {
      mounted = false
    }
  }, []);

  const onCreateTodo = async (content: string) => {
    const resp = await Service.createTodo(content);
    dispatch(createTodo(resp));
  }
  const onUpdateTodo = async (todoId: string, content: string) => {
    await Service.updateTodo(todoId, content);
    dispatch(updateTodo(todoId, content));
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

  return <Container breakpoint='sm'>
    <Column p={2} g={1}>
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
          onUpdateTodo={onUpdateTodo}
        />
        : <TextWarning>You do not have any todos yet!</TextWarning>
      }

    </Column>
  </Container>
};

export default ToDoPage;