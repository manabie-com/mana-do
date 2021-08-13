import { FC } from "react";
import "./LabelTodo.scss";

export const LabelTodo: FC<ILabelTodo> = ({
  checked,
  onChange,
  todos,
  hasCheckAll,
  title,
}) => {
  return (
    <div className="label-todo">
      <h3>{title}</h3>
      {hasCheckAll && (
        <div>
          {todos && todos.length > 0 && (
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              data-testid="label-todo-checked"
            />
          )}
          <span>Tất cả</span>
        </div>
      )}
    </div>
  );
};
