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
      <div onDoubleClick={onDoubleClick} className="item-todo">
        <div className="item-todo__content">
          <input type="checkbox" checked={checked} onChange={onChangeChecbox} />
          {editing ? (
            <input
              value={valueContent === null ? toDoContent : valueContent}
              onChange={handleChangeContentTodo}
              onKeyDown={handleUpdateContentTodo}
              className="item-todo__input"
              ref={ref}
            />
          ) : (
            <span style={{ textDecoration: checked ? "line-through" : "" }}>
              {toDoContent}
            </span>
          )}
        </div>
        <div onClick={onDelete} style={{ cursor: "pointer" }}>
          <SvgDelete />
        </div>
      </div>
    );
  }
);
