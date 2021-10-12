import React, { useState, useRef } from "react";
import {
  Button,
  ButtonColors,
  Checkbox,
  ClickOutsideComponent,
  Input,
  ModalConfirm,
  Paper,
} from "components/commons";
import { Todo } from "models/todo";
import { isTodoCompleted } from "utils";
import "./style.css";
interface Props {
  todo: Todo;
  onUpdateTodoStatus: (id: string, checked: boolean) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, content: string) => Promise<boolean>;
}

const TodoItem = (props: Props) => {
  const { todo, onUpdateTodoStatus, onDeleteTodo, onUpdateTodo } = props;
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const idSelected = useRef<string>("");

  const [editMode, setEditMode] = useState(false);
  const [valueEdit, setValueEdit] = useState("");

  function _toggleModal(id?: string) {
    setShowModalConfirm((prev) => !prev);
    idSelected.current = id || "";
  }

  function _handleDelete() {
    if (!idSelected.current) {
      return;
    }
    onDeleteTodo(idSelected.current);
    _toggleModal();
  }
  function _handleEditMode() {
    setEditMode(true);
    setValueEdit(todo.content);
  }

  async function _handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      try {
        await onUpdateTodo(todo.id, valueEdit);
        setValueEdit("");
        setEditMode(false);
      } catch (e) {
        setEditMode(false);
      }
    }
  }

  return (
    <Paper elevation={1} className={`ToDo__item p10`}>
      <Checkbox
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(todo.id, e.target.checked)}
      />
      <div className="mx10 ToDo__item-edit" onDoubleClick={_handleEditMode}>
        {!editMode ? (
          todo.content
        ) : (
          <ClickOutsideComponent onClickOutside={() => setEditMode(false)}>
            <Input
              value={valueEdit}
              onChange={(e) => setValueEdit(e.target.value)}
              onKeyDown={_handleKeyDown}
            />
          </ClickOutsideComponent>
        )}
      </div>
      <Button onClick={() => _toggleModal(todo.id)} color={ButtonColors.danger}>
        X
      </Button>

      <ModalConfirm
        onConfirm={_handleDelete}
        onClose={_toggleModal}
        show={showModalConfirm}
      />
    </Paper>
  );
};

export default TodoItem;
