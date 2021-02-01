import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  forwardRef
} from 'react';
import clsx from 'clsx';
// import { Todo } from '@components/TodoItem';
import { Todo } from 'models/todo';
// import { Todo } from '../../models/todo';
import { deleteTodo, updateTodo, updateTodoStatus } from 'store/actions';
import { initialState } from 'store/reducer';

import './index.css';
import { TodoContext } from 'App';
import { isTodoCompleted } from 'utils';

console.log(initialState);
// React.ForwardRefRenderFunction<HTMLInputElement, any>
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
      console.log(inputRef.current);
      inputRef.current?.focus();
    }
  }, [isEdit]);

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const checked = e.target.checked;
    console.log(todoId);

    setTimeout(() => {
      setCross(checked);
      dispatch(updateTodoStatus(todoId, checked));
    }, 1000);
  };

  const handleEdit = (id: string) => {
    console.log(id);
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
    setTimeout(() => {
      dispatch(deleteTodo(id));
    }, 1000);
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
          onFocus={() => {
            console.log('FOCUS');
          }}
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
