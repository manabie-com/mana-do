import React from 'react';
import ContentTodo from './ContentTodo';

const TodoItem = ({
  todo,
  handleEditTodo,
  isTodoCompleted,
  onUpdateTodoStatus,
  onDeleteTodo,
}: any) => {
  return (
    <div className='ToDo__item'>
      <input
        type='checkbox'
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      <ContentTodo todo={todo} handleEditTodo={handleEditTodo} />
      <button className='Todo__delete' onClick={() => onDeleteTodo(todo.id)}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
