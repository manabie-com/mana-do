import React from 'react';
import { AppActions, createTodo } from '../../../store/actions';
import Service from '../../../service';
import InputStyles from './Input.module.css';
import { useHistory } from 'react-router-dom';

function TodoInput({ dispatch }: { dispatch: React.Dispatch<AppActions> }) {
  const history = useHistory();

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const target = e.target as HTMLInputElement;
        const resp = await Service.createTodo(target.value);
        dispatch(createTodo(resp));
        target.value = '';
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/');
        }
      }
    }
  };

  return (
    <input
      className={InputStyles.Input}
      placeholder="What need to be done?"
      onKeyDown={onCreateTodo}
    />
  );
}

export default TodoInput;
