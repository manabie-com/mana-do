import React, { useReducer } from 'react';
import { Todo } from '../../models/todo';
import { deleteTodo, updateTodoStatus } from '../../store/actions';
import reducer, { initialState } from '../../store/reducer';

const TodoItem = (props: { todo: Todo }) => {
  const { todo: todo } = props;
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  const { id = '123', content = '' } = todo;

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    console.log(e.target.checked);
    console.log(todoId);
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  return (
    <div key={id} className='ToDo__item'>
      <input
        type='checkbox'
        // checked={isTodoCompleted(todoItem)}
        onChange={(e) => onUpdateTodoStatus(e, id)}
      />

      <input className='Todo__content' value={content} disabled></input>

      <div className='Todo__delete' onClick={() => dispatch(deleteTodo(id))}>
        <i className='bx bx-x icon'></i>
      </div>

      <div
        className='Todo__edit'
        //    onClick={() => handleEdit(id)}
      >
        <i className='bx bxs-pencil icon'></i>
      </div>
    </div>
  );
};

export default TodoItem;
