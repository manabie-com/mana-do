import React, { useContext, useState } from "react";
import { TodoStatus } from "models/todo";
import { deleteTodo, updateTodoStatus, updateTodoContent } from "store/actions";
import { TodoContext } from 'App';
import './index.scss';

export const TodoItem = (props: any) => {
  const [editing, setEditing] = useState<Boolean>(false)
  const [text, setText] = useState(props?.todo?.content);
  const { dispatch, todos } = useContext(TodoContext);

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  }

  const handleDoubleClick = () => {
    setEditing(true);
  }

  const handleOnBlur = () => {
    setEditing(false);
    setText(props?.todo?.content);
  }

  const handleSave = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdateTodo();
    }
  }

  const handleUpdateTodo = () => {
    if (!text) {
      dispatch(deleteTodo(props.todo.id));
    }
    if (todos.find(todo => todo.content === text)) {
      alert('Duplicate todo!');
      return;
    }
    dispatch(updateTodoContent(props.todo.id, text));
    setEditing(false);
  }

  return (
    <div className="todo-item">
      {!editing && <>
        <input
          type="checkbox"
          checked={TodoStatus.COMPLETED === props.todo.status}
          onChange={(e) => onUpdateTodoStatus(e, props.todo.id)}
        />
        <span onDoubleClick={handleDoubleClick}>{props.todo.content}</span>
        <button
          className="todo-item__delete"
          onClick={_ => onDeleteTodo(props.todo.id)}
        >
          X
        </button>
      </>}
      {editing && <>
        <input
          className="todo-item__input"
          autoFocus
          value={text}
          onBlur={handleOnBlur}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => handleSave(e)}
        />
      </>}
    </div>
  )
}
