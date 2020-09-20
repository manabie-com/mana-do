import { Button, Input } from 'components/atoms';
import { Todo } from 'models/todo';
import React, { ChangeEvent, useState } from 'react';
import { isTodoCompleted } from 'utils';

import "./styles.css" 

type Props = {
  onUpdateTodoStatus: (e: ChangeEvent<HTMLInputElement>, todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
  todo: Todo;
  onUpdateTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  forwardedRef?: React.RefObject<HTMLInputElement>;
}

const TodoRow = ({onUpdateTodoStatus , onUpdateTodo, onDeleteTodo, todo, forwardedRef}:Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(todo.content);

  const onDoubleClick = () => {
    setIsEdit(true);
  }
  
  const onEnterUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onUpdateTodo(e);
      setIsEdit(false);
   }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const onDiscardChange = ()=>{
    setValue(todo.content);
    setIsEdit(false);
  }

  return (
    <div key={todo.id} className="row">
        <div className="col-2 col-sm-2">
            <Input 
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)} />
        </div>
        <div className="col-7 col-sm-8">
            {
              isEdit ? 
                (
                  <Input 
                    className="w-100"
                    id={todo.id}
                    type="text"
                    value={value}
                    onKeyDown={onEnterUpdate}
                    onChange={onChange} 
                    forwardedRef={forwardedRef}
                    onBlur={onDiscardChange}
                    autoFocus={true}  />
                ) :
                (
                  <div className="text-left TodoBox__line-height-center">
                    <span onDoubleClick={onDoubleClick}>{value}</span>
                  </div>
                ) 
            }
        </div>
        <div className="col-3 col-sm-2">
            <Button className="TodoBox__delete" onClick={() => onDeleteTodo(todo.id)} >
                X
            </Button>
        </div>
    </div>
  );
};

export default TodoRow;