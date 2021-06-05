import React from 'react';
import { isTodoCompleted } from '../../../../utils';
import { Todo } from '../../../../models/todo';
import { MButton, MEditableField, MCheckbox } from '../../../commons';

interface ToDoItemProps {
  todo: Todo,
  updateTodoStatus: (checked: boolean, todoId: string) => void,
  updateTodoContent: (content: string, todoId: string) => void,
  deleteTodo: (todoId: string) => void
}

const ToDoItem = ({todo, updateTodoStatus, updateTodoContent, deleteTodo} : ToDoItemProps) => {
  return (
    <div className='Todo__item'>
      <MCheckbox checked={isTodoCompleted(todo)} onChange={(checked: boolean) => updateTodoStatus(checked, todo.id)}/>
      <MEditableField
        value={todo.content}
        actionOnChange={(value: string) => updateTodoContent(value, todo.id)}/>
      <MButton
        className='Todo__delete'
        onClickAction={() => deleteTodo(todo.id)}
      >
        X
      </MButton>
    </div>
  )
}

export default ToDoItem;
