import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from '../../store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
} from '../../store/actions';
import Service from '../../service';
import { Todo, TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import AddTodoInput from '../AddTodoInput';
import ToDoList from '../ToDoList';
import ToDoToolbar from '../ToDoToolbar';

export type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [isEditing, setIsEditing] = useState<{
    id: string | null;
    value: boolean;
  }>({
    id: null,
    value: false,
  });
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = '';
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDbClickTodo = (todo: Todo) => {
    setIsEditing({
      id: todo.id,
      value: true,
    });
    setText(todo.content);
  };

  const onEditEnd = () => {
    setIsEditing({
      id: null,
      value: false,
    });
    setText('');
  };

  const onEditTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isEditing.id && text.trim() !== '') {
      dispatch(updateTodoContent(isEditing.id, text));
      onEditEnd();
    }
  };

  const showTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (showing) {
        case TodoStatus.ACTIVE:
          return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
          return todo.status === TodoStatus.COMPLETED;
        default:
          return true;
      }
    });
  }, [todos, showing]);

  const activeTodos = useMemo(() => {
    return todos.reduce((accum, todo) => {
      return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);
  }, [todos]);

  return (
    <div className="ToDo__container">
      <h1>ToDo App</h1>
      <AddTodoInput ref={inputRef} onCreateTodo={onCreateTodo} />
      {showTodos.length === 0 && <h3>No task left</h3>}
      <ToDoList
        data={showTodos}
        inputValue={text}
        setInputValue={setText}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDbClickTodo={onDbClickTodo}
        isEditing={isEditing}
        onEditTodo={onEditTodo}
        onEditEnd={onEditEnd}
        onDeleteTodo={onDeleteTodo}
      />
      <ToDoToolbar
        todos={todos}
        activeTodos={activeTodos}
        onToggleAllTodo={onToggleAllTodo}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
      />
    </div>
  );
};

export default ToDoPage;
