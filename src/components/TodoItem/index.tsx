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
import { useReducer } from 'reinspect';
import reducer, { initialState } from 'store/reducer';

import './index.css';
import { TodoContext } from 'App';
import { getRandomColor, isTodoCompleted } from 'utils';

console.log(initialState);
// React.ForwardRefRenderFunction<HTMLInputElement, any>
const TodoItem = forwardRef<HTMLInputElement, any>((props: any, ref) => {
  const todoContext = useContext(TodoContext);
  const { store, dispatch } = todoContext as {
    store: { todos: Todo[] };
    dispatch: any;
  };

  const { updateEditId, edit = false, lineColor = '' } = props;
  const todo: Todo = props.todo;

  const [todoContent, setTodoContent] = useState('');
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
      // console.log(e);

      dispatch(updateTodoStatus(todoId, checked));
    }, 500);
  };

  const handleEdit = (id: string) => {
    // setTodoInput(e.currentTarget.value);
    console.log(id);
    updateEditId(id);
  };

  const onChangeTodoContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.currentTarget.value.trim());
  };

  const onFinishEditTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(updateTodo(id, todoContent));
      console.log('HERE');
      setIsEdit(false);
    }
  };

  const handleDeleteItem = () => {
    setTimeout(() => {
      dispatch(deleteTodo(id));
    }, 500);
  };

  return (
    <div
      //  key={id}
      className={clsx('ToDo__item', edit && 'Todo__item--edit')}
      ref={ref}
    >
      <div className='Todo__line' style={{ backgroundColor: todo.color }} />
      <input
        type='checkbox'
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, id)}
      />

      <input
        className='Todo__content'
        value={todoContent}
        disabled={!isEdit}
        onKeyDown={onFinishEditTodo}
        onChange={onChangeTodoContent}
        onFocus={() => {
          console.log('FOCUS');
        }}
        ref={inputRef}
      ></input>

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
