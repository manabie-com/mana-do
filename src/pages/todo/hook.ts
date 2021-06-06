import { useHistory } from 'react-router-dom';
import { TodoStatus } from 'models/todo';
import { useEffect, useReducer, useRef } from 'react';
import reducer, { initialState } from 'store/todo/reducer';
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  setShowingTab,
} from 'store/todo/actions';
import Service from 'service';
import { isTodoCompleted } from 'utils';

const useTodoHook = () => {
  const [{ todos, showing }, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem('token') || '';
  const history = useHistory();

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = '';
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/');
        }
      }
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

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const handleContentChange = (text: string, rowIndex: number) => {
    const cloneTodos = [...todos];
    cloneTodos[rowIndex].content = text;
    dispatch(setTodos(cloneTodos));
  };

  const handleShowAll = () => dispatch(setShowingTab('ALL'));
  const handleShowActive = () => dispatch(setShowingTab(TodoStatus.ACTIVE));
  const handleShowCompleted = () =>
    dispatch(setShowingTab(TodoStatus.COMPLETED));

  /**
   * if data in localStorage, then use that data
   * else fetch from API
   */
  const fetchList = async () => {
    let todoList = JSON.parse(localStorage.getItem(token) || '[]');

    if (todoList.length) {
      dispatch(setTodos(todoList || []));
    } else {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Persist Todo list to localStorage before user leave
   * Or: use API to save list in DB (which is not supported in this code base)
   */
  useEffect(() => {
    const beforeUnloadFn = () => {
      localStorage.setItem(token, JSON.stringify(todos));
    };

    window.addEventListener('beforeunload', beforeUnloadFn);
    return () => window.removeEventListener('beforeunload', beforeUnloadFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  return {
    todos,
    showing,
    dispatch,
    inputRef,
    onCreateTodo,
    onUpdateTodoStatus,
    onToggleAllTodo,
    onDeleteAllTodo,
    showTodos,
    activeTodos,
    handleContentChange,
    handleShowAll,
    handleShowActive,
    handleShowCompleted,
  };
};

export default useTodoHook;
