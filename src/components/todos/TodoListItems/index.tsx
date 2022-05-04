import React, { useState } from "react";
import { findTodoById, findTodoIndexById, updateTodoContent } from "../../../utils/todoUtils";
import { isTodoCompleted } from "../../../utils";
import { deleteTodo, updateTodoContent as updateTodoContentAction, updateTodoStatus } from "../../../store/actions";
import { getTodosFromStorage } from "../../../utils/storageUtils";
import { useAppContext } from "../../../AppContext";
import { ListItemWrapper } from "./styles";
import { Draggable } from "react-beautiful-dnd";
import CrossIcon from "../../../assets/icons/CrossIcon";
import { Todo } from "../../../models/todo";

interface TodoListItemsProps {
  id: string;
  index?: number;
}

const TodoListItems = ({ id, index = 0 }: TodoListItemsProps) => {
  const {
    state: { todos },
    dispatch,
  } = useAppContext();
  const [todosValue, setTodosValue] = useState(todos);
  const todo = findTodoById(todos, id) ?? ({} as Todo);
  const [toggle, setToggle] = useState({});
  const foundIndex = findTodoIndexById(todosValue, id);
  const text = todosValue[foundIndex].content;

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const deleteTodoItem = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onDoubleClickItem = (e: React.MouseEvent<HTMLDivElement>) => {
    setToggle((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const onLiveEditKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLTextAreaElement;
    if (event.key === "Enter" || event.key === "Escape") {
      if (event.key === "Escape") {
        setTodosValue(getTodosFromStorage());
      }

      if (event.key === "Enter") {
        const newTodos = updateTodoContent(todosValue, todo.id, target.value);
        setTodosValue(newTodos);
        dispatch(updateTodoContentAction(todo.id, target.value));
      }

      setToggle((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  const onChangeLiveEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const foundIndex = findTodoIndexById(todos, todo.id);
    let newTodos = [...todos];
    newTodos[foundIndex] = {
      ...newTodos[foundIndex],
      content: value,
    };
    setTodosValue(newTodos);
  };

  const onBlurLiveEdit = () => {
    setToggle((prev) => ({
      ...prev,
      [id]: false,
    }));
    setTodosValue(getTodosFromStorage());
  };

  return (
    <Draggable key={id} draggableId={"draggable-" + id} index={index}>
      {(provided, snapshot) => (
        <ListItemWrapper
          key={id}
          className="list-item"
          onDoubleClick={onDoubleClickItem}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-testid="list-item-wrapper"
        >
          <div className="text_and_checkbox">
            <input
              id={todo.id}
              type="checkbox"
              data-testid="toggle-all"
              checked={isTodoCompleted(todo)}
              onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            {!toggle[id] && <label htmlFor={todo.id}>{text}</label>}
            {toggle[id] && (
              <input
                autoFocus
                type="text"
                className="input_live_edit"
                value={text}
                onChange={onChangeLiveEdit}
                onBlur={onBlurLiveEdit}
                onKeyDown={onLiveEditKeydown}
                data-testid="live-edit-todo-content"
              />
            )}
          </div>

          <div className="delete">
            <button className="delete-btn" data-testid="delete-all-todo-item" onClick={() => deleteTodoItem(id)}>
              <CrossIcon />
            </button>
          </div>
        </ListItemWrapper>
      )}
    </Draggable>
  );
};

export default TodoListItems;
