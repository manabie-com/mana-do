import React, { useState, useRef } from "react";
import { Todo, TodoStatus } from "models/todo";
import { EnhanceTodoStatus } from "pages/ToDoPage";
import { isTodoCompleted } from "utils";
import {
  Button,
  ButtonColors,
  Checkbox,
  ModalConfirm,
  Paper,
} from "components/commons";
import "./style.css";

interface Props {
  todos: Todo[];
  onFilter: (status: EnhanceTodoStatus) => void;
  showing: EnhanceTodoStatus;
  onUpdateTodoStatus: (id: string, checked: boolean) => void;
  onDeleteTodo: (id: string) => void;
}

const ListToDo = (props: Props) => {
  const { todos, showing, onUpdateTodoStatus, onDeleteTodo } = props;
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const idSelected = useRef<string>("");

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

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

  return (
    <div data-testid="testid_ToDo__list" className="ToDo__list">
      {showTodos.map((todo, index) => {
        return (
          <Paper
            elevation={1}
            key={index}
            className={`ToDo__item p10 ToDo__item${index}`}
          >
            <Checkbox
              checked={isTodoCompleted(todo)}
              onChange={(e) => onUpdateTodoStatus(todo.id, e.target.checked)}
            />
            <span>{todo.content}</span>
            <Button
              onClick={() => _toggleModal(todo.id)}
              color={ButtonColors.danger}
            >
              X
            </Button>
          </Paper>
        );
      })}
      <ModalConfirm
        onConfirm={_handleDelete}
        onClose={_toggleModal}
        show={showModalConfirm}
      />
    </div>
  );
};

export default ListToDo;
