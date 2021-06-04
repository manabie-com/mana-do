import {isTodoCompleted} from '../../../../utils';
import React from 'react';
import {Todo} from '../../../../models/todo';
import MButton from "../../../commons/MButton/MButton";
import MEditableField from "../../../commons/MEditableField/MEditableField";

interface ToDoItemProps {
  todo: Todo,
  updateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void,
  updateTodoContent: (content: string, todoId: string) => void,
  deleteTodo: (todoId: string) => void
}

const ToDoItem = ({todo, updateTodoStatus, updateTodoContent, deleteTodo} : ToDoItemProps) => {
  return (
    <div className='Todo__item'>
      <input
        type='checkbox'
        checked={isTodoCompleted(todo)}
        onChange={(e) => updateTodoStatus(e, todo.id)}
      />
      <MEditableField
        value={todo.content}
        actionOnChange={(value) => updateTodoContent(value, todo.id)}/>
      <MButton
        btnExtraClassName='Todo__delete'
        onClickAction={() => deleteTodo(todo.id)}
      >
        X
      </MButton>
    </div>
  )
}

export default ToDoItem;
