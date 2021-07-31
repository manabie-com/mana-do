import React, { useRef, useState } from 'react';
import { isTodoCompleted } from '../../../utils';
import {
  AppActions,
  deleteTodo,
  updateTodo,
  updateTodoStatus,
} from '../../../store/actions';
import { Todo } from '../../../models/todo';
import useOnClickOutside from '../../../hook/outsideClick';
import ItemStyles from './Item.module.css';

type TodoItemProps = {
  todo: Todo;
  dispatch: React.Dispatch<AppActions>;
};

function TodoItem({ todo, dispatch }: TodoItemProps) {
  const ref = useRef(null);
  const [isUpdating, setUpdateStatus] = useState(false);
  useOnClickOutside(ref, () => {
    setUpdateStatus(false);
  });

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  return (
    <div key={todo.id} className={ItemStyles.Item}>
      <input
        type="checkbox"
        className={ItemStyles.Checkbox}
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />

      {isUpdating ? (
        <input
          ref={ref}
          type={'text'}
          className={ItemStyles.Input}
          autoFocus
          defaultValue={todo.content}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              const target = event.target as HTMLInputElement;
              dispatch(updateTodo({ ...todo, content: target.value }));
              setUpdateStatus(false);
            }
          }}
        />
      ) : (
        <div
          className={ItemStyles.Content}
          onDoubleClick={() => {
            setUpdateStatus(true);
          }}
        >
          {todo.content}
        </div>
      )}

      <button
        className={ItemStyles.Button}
        onClick={() => {
          dispatch(deleteTodo(todo.id));
        }}
      >
        &times;
      </button>
    </div>
  );
}

export default TodoItem;
