import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import reducer, { initialState } from '../../store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import Button from '../../component/Button/Button';
import Input from '../../component/Input/Input';
import { notify } from '../../component/Toast/Toast';

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface ITempValue {
  todoId: string;
  content: string;
}

const ToDoPage = () => {
  const getShowing: EnhanceTodoStatus = localStorage.getItem('showing')
    ? JSON.parse(localStorage.getItem('showing') || '{}')
    : 'ALL';

  const [{ todos }, dispatch] = React.useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>(getShowing);
  const [toggle, setToggle] = useState<string>('');
  const history = useHistory();
  const [isHasBackspace, setHasBackspace] = useState<boolean>(false);
  const [tempValue, setTempValue] = useState<ITempValue>({
    todoId: '',
    content: ''
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      localStorage.removeItem('todos');
    }
    // eslint-disable-next-line
  }, [todos.length]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        if (inputRef.current.value === '') {
          notify.error(t('ERRORS.FIELD_REQUIRED'));
        } else {
          const resp = await Service.createTodo(inputRef.current.value);
          if (resp) {
            notify.success(t('INPUT.ADD_TODO_SUCCESSFULLY', { value: resp.content }));
            dispatch(createTodo(resp));
          }

          inputRef.current.value = '';
        }
      } catch (e) {
        if (e.response?.status === 401) {
          history.push('/');
        }
      }
    }
  };

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    notify.success(t('INPUT.REMOVE_ALL_SUCCESSFULLY'));
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

  const renderCheckBox =
    todos.length > 0 ? (
      <Input type="checkbox" checked={activeTodos === 0} onChange={onToggleAllTodo} title="All Todo is checked" />
    ) : (
      <div />
    );

  const onFocus = () => {
    setHasBackspace(false);
  };
  const onBlur = () => {
    setToggle('');
    setTempValue({ todoId: '', content: '' });
  };
  const onDoubleClick = (todoId: string) => () => {
    setToggle(todoId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setHasBackspace(true);
    }
  };

  const onUpdateTodo = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
    if (e.key === 'Enter') {
      if (tempValue.content === '' && isHasBackspace) {
        dispatch(deleteTodo(todoId));
      }
      tempValue.content && dispatch(updateTodo(todoId, tempValue.content));
      setTempValue({ todoId: '', content: '' });
      setToggle('');
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    setTempValue({ todoId, content: e.target.value });
  };

  const onShowing = (value: EnhanceTodoStatus) => () => {
    localStorage.setItem('showing', JSON.stringify(value));
    setShowing(value);
  };
  const renderToDoList = showTodos.map((todo, index) => {
    const { id, content } = todo;
    return (
      <div key={id + index} className="ToDo__item">
        <Input type="checkbox" checked={isTodoCompleted(todo)} onChange={(e) => onUpdateTodoStatus(e, id)} />
        {toggle === id ? (
          <Input
            type="text"
            value={id === tempValue.todoId ? tempValue.content : content}
            className="ToDo__edit"
            onChange={(e) => onChange(e, id)}
            onBlur={onBlur}
            onKeyPress={(e) => onUpdateTodo(e, id)}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            autoFocus
          />
        ) : (
          <span onDoubleClick={onDoubleClick(id)}>{content}</span>
        )}
        <Button
          className="Todo__delete"
          onClick={() => dispatch(deleteTodo(id))}
          children="X"
          style={{ backgroundColor: '#dc3545' }}
        />
      </div>
    );
  });

  return (
    <div className="ToDo__container">
      <h2>{t('COMMONS.TITLE_LIST_TODO')}</h2>
      <div className="Todo__creation">
        <Input
          ref={inputRef}
          className="Todo__input"
          data-testid="input_create"
          placeholder={t('INPUT.PLACEHOLDER_CREATE_TODO')}
          onKeyPress={onCreateTodo}
          title={t('INPUT.TITLE_CREATE_TODO')}
          required
        />
      </div>
      <div className="ToDo__list">{renderToDoList}</div>
      <div className="Todo__toolbar">
        {renderCheckBox}
        <div className="Todo__tabs">
          <Button
            className="Action__btn"
            onClick={onShowing('ALL')}
            children={t('All')}
            disabled={showing === 'ALL'}
            title={t('BUTTON.TITLE_ALL')}
          />
          <Button
            className="Action__btn"
            onClick={onShowing(TodoStatus.ACTIVE)}
            children={t('COMMONS.ACTIVE')}
            disabled={showing === TodoStatus.ACTIVE}
            style={{ backgroundColor: '#28a745' }}
            title={t('BUTTON.TITLE_ACTIVE')}
          />
          <Button
            className="Action__btn"
            onClick={onShowing(TodoStatus.COMPLETED)}
            children={t('COMMONS.COMPLETED')}
            disabled={showing === TodoStatus.COMPLETED}
            title={t('BUTTON.TITLE_COMPLETED')}
          />
          <Button
            className="Action__btn"
            onClick={onDeleteAllTodo}
            children={t('COMMONS.CLEAR_ALL')}
            disabled={todos.length === 0}
            style={{ backgroundColor: '#dc3545' }}
            title={t('BUTTON.TITLE_CLEAR_ALL')}
          />
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
