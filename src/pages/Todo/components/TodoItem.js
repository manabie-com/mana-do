import { useEffect, useRef, useState } from "react";

import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdDelete } from "react-icons/md";

import { isTodoCompleted } from "utils";
import { TaskContainer, Center, Left, Right } from '../Todo.styles';
import { Input } from "styles/Input.styles";

export default function TodoList({ ...props }) {
  const {
    onClickDeleteTodo = () => { },
    onUpdateTodoStatus = () => { },
    onUpdateTodoContent = () => { },
    todo = {
      content: "",
    },
  } = props;
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setEdit(false);
      if (inputRef && inputRef.current) {
        inputRef.current.value = todo.content;
      }
      try {
        document.removeEventListener("mousedown", handleClickOutside);
      } catch (error) { }
    }
  };

  const handleEnterKeyboard = (e) => {
    if (e.key === "Enter") {
      const newValue =
        (inputRef && inputRef.current && inputRef.current.value) || "";
      onUpdateTodoContent(newValue, todo.id, setEdit(false));
      try {
        document.removeEventListener("mousedown", handleClickOutside);
      } catch (error) { }
    }
  };
  useEffect(() => {
    if (edit && inputRef && inputRef.current) {
      inputRef.current.value = todo.content;
    }
    return document.removeEventListener("mousedown", handleClickOutside);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);
  return (
    <TaskContainer
      ref={ref}
      color={todo.color}
    >
      <Left>
        <div
          onClick={() => onUpdateTodoStatus(!isTodoCompleted(todo), todo.id)}
        >
          <span className='flex-box cursor-pointer'>
            {isTodoCompleted(todo) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
          </span>
        </div>
      </Left>
      {!edit ? (
        <Center className='justify-left ph-8' title="Doubleclick to edit content"
          onDoubleClick={() => {
            if (!edit) {
              setEdit(true);
              document.addEventListener("mousedown", handleClickOutside);
            }
          }}
        >
          <span className={isTodoCompleted(todo) ? 'text-line-through' : ''}>{todo.content}</span>
        </Center>
      ) : (
        <Center className='justify-left ph-8'>
          <Input
            ref={inputRef}
            onKeyDown={handleEnterKeyboard}
            className="ma-text ma-input-edit ma-input-edit-todo"
          />
        </Center>
      )}
      <Right className='cursor-pointer' onClick={() => onClickDeleteTodo(todo.id)}>
        <MdDelete />
      </Right>
    </TaskContainer>
  );
}
