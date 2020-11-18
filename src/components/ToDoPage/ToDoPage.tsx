import React, {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from '../../store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  editTodoContent,
  updateTodoStatus,
} from '../../store/actions';
import Service from '../../service';
import { Todo, TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import { LOGIN_KEYS } from '../../models/auth';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = memo(({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputCreatedTodoRef = useRef<HTMLInputElement>(null);
  const inputEditedTodoRef = useRef<HTMLInputElement>(null);
  const [editTodo, setEditTodo] = useState({ todo: { id: '' }, index: -1 });
  const [isShowEditInput, setIsShowEditInput] = useState(false);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem(LOGIN_KEYS.token);
    !token && history.push('/');
  }, [history]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const getTodosFromAPI = useCallback(async () => {
    const resp = await Service.getTodos();
    return resp;
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await getTodosFromAPI();
      dispatch(setTodos(resp));
    })();
  }, [getTodosFromAPI]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      inputCreatedTodoRef.current &&
      inputCreatedTodoRef.current.value !== ''
    ) {
      try {
        const resp = await Service.createTodo(
          inputCreatedTodoRef.current.value
        );
        dispatch(createTodo(resp));
        inputCreatedTodoRef.current.value = '';
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

  const onClickEditTodo = (todo: Todo, index: number) => {
    setIsShowEditInput(true);
    setEditTodo({ todo, index });
  };
  const onEditTodoContent = async (todoId: string) => {
    if (inputEditedTodoRef.current && inputEditedTodoRef.current.value !== '') {
      dispatch(editTodoContent(todoId, inputEditedTodoRef.current.value));
      setIsShowEditInput(false);
    }
  };
  const onMouseOutFocusEdit = useCallback(
    (e: MouseEvent) => {
      if (
        inputEditedTodoRef.current &&
        !inputEditedTodoRef.current.contains(e.target as HTMLElement)
      ) {
        editTodo.todo.id !== '' && onEditTodoContent(editTodo.todo.id);
      }
      return;
    },
    [editTodo]
  );

  const onKeyDownEdit = (
    todoId: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      onEditTodoContent(todoId);
    }
    return;
  };

  useEffect(() => {
    document.addEventListener('mousedown', onMouseOutFocusEdit);

    return () => {
      document.removeEventListener('mousedown', onMouseOutFocusEdit);
    };
  }, [onMouseOutFocusEdit]);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputCreatedTodoRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo, index) => {
          return (
            <div
              key={index}
              className="ToDo__item"
              onDoubleClick={() => onClickEditTodo(todo, index)}
            >
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {isShowEditInput && index === editTodo.index ? (
                <input
                  ref={inputEditedTodoRef}
                  type="text"
                  defaultValue={todo.content}
                  onKeyDown={(e) => onKeyDownEdit(todo.id, e)}
                />
              ) : (
                <span>{todo.content}</span>
              )}
              <button
                className="Todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <></>
        )}
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={() => setShowing('ALL')}>
            All
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
});

export default ToDoPage;
