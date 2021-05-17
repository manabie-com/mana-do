import React, { useCallback, useRef, useState } from "react";
import { Todo, TodoStatus } from "../models/todo";
import classnames from "classnames";
import { isTodoActive, isTodoCompleted } from "../utils";

type TodoListItemProps = {
  dataSource: Todo;
  onDelete: Function;
  onUpdate: Function;
};

const ToDoListItem = ({
  dataSource,
  onDelete,
  onUpdate,
}: TodoListItemProps) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);

  /**
   * Handler show edit input
   * @description Triger when user double click content
   */
  const handleShowEdit = () => {
    if (isEdit) return;
    setIsEdit(true);
    setTimeout(() => {
      if (inputEl !== null && inputEl.current != null) {
        inputEl.current.value = dataSource.content;
        inputEl.current.focus();
      }
    }, 50);
  };
  /**
   * Handler edit input
   * @description Triger when user press enter
   */
  const handleUpdateContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputEl.current && inputEl.current.value) {
      if (inputEl.current.value.trim().length === 0) return;
      onUpdate({
        key: dataSource.id,
        name: "content",
        value: inputEl.current.value,
      });
      setIsEdit(false);
    }
  };
  /**
   * Handler delete item in list
   * @description Triger when user click delete button (x button)
   */
  const handleDeleteTodo = useCallback(() => {
    onDelete(dataSource.id);
  }, [dataSource, onDelete]);
  /**
   * Handler update item status in list
   * @description Triger when user click checkbox input
   */
  const handleUpdateTodo = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      onUpdate({
        key: dataSource.id,
        name: "status",
        value: isChecked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
      });
    },
    [dataSource, onUpdate]
  );
  return (
    <div
      className={classnames("todo__list-item", {
        "todo__list-item--active": isTodoActive(dataSource),
        "todo__list-item--completed": isTodoCompleted(dataSource),
      })}
    >
      <input
        className="item__status"
        type="checkbox"
        checked={isTodoCompleted(dataSource)}
        onChange={handleUpdateTodo}
      />
      <span
        onDoubleClick={handleShowEdit}
        onBlur={() => (isEdit ? setIsEdit(false) : null)}
        className={classnames("item__content", {
          "item__content--edit": isEdit,
          "item__content--read": !isEdit,
        })}
      >
        {/* When read */}
        <span className="content--read">{dataSource.content}</span>
        {/* When edit */}
        <input
          className="content--edit"
          ref={inputEl}
          type="text"
          defaultValue={dataSource.content}
          onKeyDown={handleUpdateContent}
        />
      </span>
      <button className="item__action" onClick={handleDeleteTodo}>
        X
      </button>
    </div>
  );
};

export default ToDoListItem;
