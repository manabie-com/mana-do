import React from 'react';
import { useToDoPageContext } from '../../../context/ToDoPageProvider';
import { TodoStatus } from '../../../models/todo';
import Service from '../../../service';
import { deleteTodo, updateTodoStatus } from '../../../store/actions';

interface Props {
  checked: boolean;
  content: string;
  id: string;
}

/* I created a new component to separate the handling logic 
making us have as many stateless components as possible
1. Reusable
2. Capable of maintenance
3. Flexibility
*/
const ToDoItem: React.FC<Props> = ({ id, checked, content }) => {
  const { dispatch } = useToDoPageContext();
  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    // optimis update
    Service.updateTodo(id, checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE);
    dispatch(updateTodoStatus(id, e.target.checked));
  };
  const handleOnClickDeleteTodo = (): void => {
    // optimis delete
    Service.deleteTodo(id);
    dispatch(deleteTodo(id));
  };
  return (
    <div className='ToDo__item'>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onUpdateTodoStatus(e)}
      />
      <span>{content}</span>
      <button className='Todo__delete' onClick={handleOnClickDeleteTodo}>
        X
      </button>
    </div>
  );
};

export default ToDoItem;
