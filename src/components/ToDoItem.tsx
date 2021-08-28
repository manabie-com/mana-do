import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import "./ToDoItem.scss";
import TextInput from "./TextInput";
import {Todo, TodoStatus} from "../models/todo";
import Service from "../service";
import {createTodo} from "../store/actions";


interface ToDoItemProps {
  item: Todo
  checked: boolean;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
  onRemoveItem: () => void,
  onEditItem: (todo: Todo) => void
}

function ToDoItem(props: ToDoItemProps) {
  const {item, onCheck, checked, onRemoveItem, onEditItem} = props;
  const [isEditing, setIsEditing] = useState(false)
  const [editInput, setEditInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const onCheckHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(e, item.id)
  }, [onCheck, item])

  const onEditHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(!isEditing){
      setIsEditing(true);
    }
    // onEditItem(item);
  }, [isEditing])

  const onEditToDo = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputRef.current) {
        let newTodo = {...item};
        newTodo.content = editInput;
        inputRef.current.value = '';
        setIsEditing(false);
        onEditItem(newTodo)
      }
    },
    [ inputRef, editInput, item, onEditItem],
  );

  const onChangeHandler = useCallback((e) => {
    setEditInput(e.target.value);
  },[setEditInput])


  return (
    <div className="toDoItem" key={item.id}>
      <div className="toDoItem__checkBox">
        <input className="toDoItem__checkBox__input" type="checkbox" checked={checked} onChange={onCheckHandler}/>
      </div>
      <div className="toDoItem__content" onDoubleClick={onEditHandler}>
        {isEditing ?
          <TextInput name="Edit" ref={inputRef} onKeyDown={onEditToDo} onChange={onChangeHandler}/> : item.content}
      </div>
      <div className="toDoItem__delete">
        <button onClick={onRemoveItem}>X</button>
      </div>
    </div>
  )
}

export default React.memo(ToDoItem);
