import React, { useState, useEffect, useRef } from "react";
import {
  deleteTodo,
  updateTodoStatus,
  updateTodo,
} from "../../store/actions";
import { isTodoCompleted } from "../../utils";

const TodoItem = ({ key, todo, dispatch }: any) => {
  const [editText, setEditText] = useState("")
  const [isEdit, setIsEdit] = useState(false);
  const newField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const node = newField.current
    node?.focus();
  })

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const handleChange = (event: React.FormEvent) => {
    var input: any = event.target;
    setEditText(input.value);
  }

  const handleSubmit = (event: React.FormEvent) => {
    var val = editText.trim();
    if (val) {
      dispatch(updateTodo({ ...todo, content: val }))
      setEditText(val);
    } else {
      setIsEdit(false);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 27) {
      console.log(editText, todo.content)
      setEditText(todo.content)
      setIsEdit(false);
    } else if (event.keyCode === 13) {
      handleSubmit(event);
      setIsEdit(false);
    }
  }


  const handleEdit = () => {
    setIsEdit(true);
    setEditText(todo.content)
  }

  return (
    <div key={key} className="ToDo__item" 
    > 
      <input
        data-testid="checkbox"
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      // onDoubleClick={handleEdit}
      />
      {!isEdit ? <span onDoubleClick={handleEdit}
        data-testid="content"
      >{todo.content}</span> :
        <input
          ref={newField}
          className="edit"
          value={editText}
          onBlur={handleSubmit}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{ "position": "absolute" }}
        />}
      <button
        className="Todo__delete"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        X
      </button>
    </div>
  );
};


export default TodoItem;