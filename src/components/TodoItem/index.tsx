import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  forwardRef
} from 'react';
import clsx from 'clsx';

import { Todo } from 'models/todo';
import { deleteTodo, updateTodo, updateTodoStatus } from 'store/actions';

import { TodoContext } from 'App';
import { isTodoCompleted } from 'utils';
import './index.css';

const TodoItem = forwardRef<HTMLInputElement, any>((props: any, ref) => {
  const todoContext = useContext(TodoContext);
  const { store, dispatch } = todoContext as {
    store: { todos: Todo[] };
    dispatch: any;
  };

  const { updateEditId, edit = false } = props;
  const todo: Todo = props.todo;

  const [todoContent, setTodoContent] = useState('');
  const [cross, setCross] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const { id = '123', content = '' } = todo;

  useEffect(() => {
    setTodoContent(content);
  }, [content]);

  useEffect(() => {
    setIsEdit(edit);
  }, [edit]);

  useEffect(() => {
    if (isEdit && inputRef) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const checked = e.target.checked;

    setCross(checked);
    dispatch(updateTodoStatus(todoId, checked));
  };

  const handleEdit = (id: string) => {
    // Cannot edit ticket after complete
    if (isTodoCompleted(todo)) {
      return;
    }
    updateEditId(id);
  };

  const onChangeTodoContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.currentTarget.value.trim());
  };

  const onFinishEditTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(updateTodo(id, todoContent));
      setIsEdit(false);
      updateEditId('');
    }
  };

  const handleDeleteItem = () => {
    dispatch(deleteTodo(id));
  };

  console.log(store);

  return (
    <div className={clsx('ToDo__item', edit && 'Todo__item--edit')} ref={ref}>
      <div className='Todo__line' style={{ backgroundColor: todo.color }} />

      {/* Checkbox */}
      <div className='wrapper'>
        <input
          className='checkbox'
          type='checkbox'
          checked={isTodoCompleted(todo)}
          onChange={(e) => onUpdateTodoStatus(e, id)}
        />

        <div className='box'>
          <div className='tick tick-left'></div>
          <div className='tick tick-right'></div>
        </div>

        <div className='line top'></div>
        <div className='line left'></div>
        <div className='line bottom'></div>
        <div className='line right-top'></div>
        <div className='line right-bottom'></div>
      </div>
      {/* /Checkbox */}

      <div
        className={clsx(
          'Todo__content',
          (cross || isTodoCompleted(todo)) && 'cross'
        )}
      >
        <input
          value={todoContent}
          disabled={!isEdit}
          onKeyDown={onFinishEditTodo}
          onChange={onChangeTodoContent}
          ref={inputRef}
        ></input>
      </div>

      <div className='Todo__delete' onClick={() => handleDeleteItem()}>
        <i className='bx bx-x icon'></i>
      </div>

      <div className='Todo__edit' onClick={() => handleEdit(id)}>
        <i className='bx bxs-pencil icon'></i>
      </div>
    </div>
  );
});

export default TodoItem;
