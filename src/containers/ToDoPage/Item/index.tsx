import React, {
  Dispatch,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { deleteTodo, updateTodo } from "../../../store/actions";
import { isTodoCompleted } from "../../../utils";
import { useOutside } from "../../../utils/common";
import "./index.css";

interface Props {
  data: any;
  onUpdateTodoStatus: any;
  dispatch: Dispatch<any>;
}

const Item: FC<Props> = ({ data, onUpdateTodoStatus, dispatch }) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onCloseEdit = useCallback(() => {
    setEdit(false);
  }, []);

  useOutside(inputRef, onCloseEdit);

  const onOpenEdit = useCallback(() => {
    setEdit(true);
  }, []);

  const onEdit = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputRef.current) {
        dispatch(updateTodo(data.id, inputRef.current.value));
        inputRef.current.value = "";
        setEdit(false);
      }
    },
    [data.id, dispatch]
  );

  useEffect(() => {
    if (inputRef?.current?.focus) {
      inputRef?.current?.focus();
    }
  }, [edit]);

  return (
    <div className="Item">
      <input
        type="checkbox"
        checked={isTodoCompleted(data)}
        onChange={(e) => onUpdateTodoStatus(e, data.id)}
      />
      <div className="Item__text" onDoubleClick={onOpenEdit}>
        {edit ? (
          <input
            defaultValue={data.content}
            onKeyDown={onEdit}
            ref={inputRef}
          />
        ) : (
          <div className="Item__tooltip">
            <div className="Item__tooltip__div">{data.content}</div>
            <span className="Item__tooltip__span">{data.content}</span>
          </div>
        )}
      </div>
      <button
        className="Item__delete"
        onClick={() => dispatch(deleteTodo(data.id))}
      >
        X
      </button>
    </div>
  );
};

export default Item;
