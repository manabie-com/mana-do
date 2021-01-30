import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// import { Todo } from '@components/TodoItem';
import { Todo } from 'models/todo';
// import { Todo } from '../../models/todo';
import { deleteTodo, updateTodo, updateTodoStatus } from 'store/actions';
import { useReducer } from 'reinspect';
import reducer, { initialState } from 'store/reducer';
// import reducer, { initialState } from '@components';

import './index.css';

const TodoItem = (props: any) => {
  const { updateEditId, edit = false } = props;
  const todo: Todo = props.todo;
  const [{ todos }, dispatch] = useReducer(
    reducer,
    initialState,
    (a) => a,
    'todosState'
  );
  const [todoContent, setTodoContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { id = '123', content = '' } = todo;

  useEffect(() => {
    setTodoContent(content);
  }, [content]);

  useEffect(() => {
    setIsEdit(edit);
  }, [edit]);

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    console.log(e.target.checked);
    console.log(todoId);

    dispatch(updateTodoStatus(todoId, e.target.checked));
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

  return (
    <div key={id} className={clsx('ToDo__item', edit && 'Todo__item--edit')}>
      <input
        type='checkbox'
        // checked={isTodoCompleted(todoItem)}
        onChange={(e) => onUpdateTodoStatus(e, id)}
      />

      <input
        className='Todo__content'
        value={todoContent}
        disabled={!isEdit}
        onKeyDown={onFinishEditTodo}
        onChange={onChangeTodoContent}
      ></input>

      <div className='Todo__delete' onClick={() => dispatch(deleteTodo(id))}>
        <i className='bx bx-x icon'></i>
      </div>

      <div className='Todo__edit' onClick={() => handleEdit(id)}>
        <i className='bx bxs-pencil icon'></i>
      </div>
    </div>
  );
};

export default TodoItem;
