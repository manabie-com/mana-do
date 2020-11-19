import React, {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer from '../../store/reducer';
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
import ToDoList from './ToDoList/ToDoList';
import './styles.css';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const actionButtons = [
  {
    label: 'All',
    className: 'action-btn-primary',
    statusType: 'ALL' as EnhanceTodoStatus,
  },
  {
    label: 'Active',
    className: 'action-btn-primary',
    statusType: TodoStatus.ACTIVE,
  },
  {
    label: 'Completed',
    className: 'action-btn-primary',
    statusType: TodoStatus.COMPLETED,
  },
];

const ToDoPage = memo(({ history }: RouteComponentProps) => {
  const [initialState] = useState({ todos: [] });
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputCreatedTodoRef = useRef<HTMLInputElement>(null);
  const inputEditedTodoRef = useRef<HTMLInputElement>(null);
  const [editTodo, setEditTodo] = useState({ todo: { id: '' }, index: -1 });
  const [isShowEditInput, setIsShowEditInput] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOGIN_KEYS.token);
    !token && history.push('/');
  }, [history]);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp));
    })();
  }, []);

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

  const onMouseOutFocusEdit = (e: React.FocusEvent<HTMLInputElement>) => {
    onEditTodoContent(editTodo.todo.id);
  };

  const onKeyDownEdit = (
    todoId: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      onEditTodoContent(todoId);
    }
    return;
  };

  const renderActionButtons = useCallback(() => {
    return (
      <div className="Todo__tabs">
        {actionButtons.map((btn) => (
          <button
            className={btn.className}
            onClick={() => setShowing(btn.statusType ?? 'ALL')}
          >
            {btn.label}
          </button>
        ))}
      </div>
    );
  }, []);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };
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
      <ToDoList
        className="todo-item"
        inputEditedTodoRef={inputEditedTodoRef}
        todosList={showTodos}
        isShowEditInput={isShowEditInput}
        editTodoIndex={editTodo.index}
        handleDeleteTodo={handleDeleteTodo}
        onClickEditTodo={onClickEditTodo}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onMouseOutFocusEdit={onMouseOutFocusEdit}
        onKeyDownEdit={onKeyDownEdit}
      />
      <div>
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
          {renderActionButtons()}
          <button className="action-btn-danger" onClick={onDeleteAllTodo}>
            Clear all todos
          </button>
        </div>
      </div>
    </div>
  );
});

export default ToDoPage;
