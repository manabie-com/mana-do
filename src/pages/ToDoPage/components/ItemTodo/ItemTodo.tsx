import { forwardRef } from "react";
import { SvgDelete } from "../../../../assets";
import "./ItemTodo.scss";

export const ItemTodo = forwardRef<any, IItemTodo>(
  (
    {
      onDoubleClick,
      onChangeChecbox,
      checked,
      editing,
      valueContent,
      onDelete,
      toDoContent,
      handleChangeContentTodo,
      handleUpdateContentTodo,
    },
    ref
  ) => {
    return (
      <div
        onDoubleClick={onDoubleClick}
        className="item-todo"
        data-testid="item-todo"
      >
        <div className="item-todo__content">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChangeChecbox}
            data-testid="item-todo-checked"
          />
          {editing ? (
            <input
              value={valueContent === null ? toDoContent : valueContent}
              onChange={handleChangeContentTodo}
              onKeyDown={handleUpdateContentTodo}
              className="item-todo__input"
              ref={ref}
            />
          ) : (
            <span
              style={{ textDecoration: checked ? "line-through" : "" }}
              data-testid="item-tod-span"
            >
              {toDoContent}
            </span>
          )}
        </div>
        <div
          onClick={onDelete}
          data-testid="item-todo-delete"
          style={{ cursor: "pointer" }}
          className="item-todo__delete"
        >
          <SvgDelete />
        </div>
      </div>
    );
  }
);
