import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import styled from "styled-components";
import {
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  setTodos,
  updateTodo,
} from "../store/actions";
import Service from "../service";
import { TodoStatus, EnhanceTodoStatus, TodoList } from "../models/todo";
import { AppState } from "../store/reducer";
import { LIST_TAB } from "../utils/constants";
import { isValidCreate } from "../utils/validate";
import Modal from "../components/Modal";

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 8px;
  width: 500px;
  margin-top: 5rem;
  padding: 24px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.09), 3px 2px 3px rgba(0, 0, 0, 0.05);
`;

const ToDoPage = () => {
  const todos = useSelector((state: AppState) => state.todos);
  const dispatch = useDispatch();
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [items, setItems] = useState<TodoList[]>([]);
  const [input, setInput] = useState<string>("");
  const [itemEdit, setItemEdit] = useState<TodoList>();
  const [inputItem, setInputItem] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValidCreate(todos, input)) {
      const resp = await Service.createTodo(input);
      if (resp.id) {
        dispatch(createTodo(resp));
        setInput("");
      }
    }
  };

  const onUpdateTodo = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.key === "Enter" && isValidCreate(todos, inputItem)) {
      dispatch(updateTodo(id, inputItem));
      setItemEdit(undefined);
      setInputItem("");
      setVisible(false);
    }
  };

  useEffect(() => {
    var listData = [] as TodoList[];
    todos
      .filter((item) => showing === "ALL" || item.status === showing)
      .forEach((item) => {
        listData.push({
          ...item,
          id: item.number_id,
          todo_id: item.id,
        });
      });
    setItems(listData);
  }, [todos, showing]);

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const itemRenderer = (item: TodoList): any => {
    return (
      <div key={item.id} className="ToDo__item">
        <input
          type="checkbox"
          checked={item.status === TodoStatus.COMPLETED}
          onChange={(e) => onUpdateTodoStatus(e, item.todo_id)}
        />
        <span
          onClick={() => {
            setItemEdit(item);
            setVisible(true);
            setInputItem(item.content);
          }}
        >
          {item.content}
        </span>
        <input
          type="button"
          className="Todo__delete"
          onClick={() => onDeleteTodo(item.todo_id)}
          value="X"
        />
      </div>
    );
  };
  const handleRLDDChange = (reorderedItems: Array<TodoList>) => {
    dispatch(
      setTodos(
        reorderedItems.map((item) => {
          const newItem = {
            ...item,
            id: item.todo_id,
            number_id: item.id,
          };
          return newItem;
        })
      )
    );
  };

  return (
    <Container>
      <div className="Todo__creation">
        <input
          value={input}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </div>
      <div className="Todo__toolbar">
        <input
          style={{ visibility: items.length > 0 ? "visible" : "hidden" }}
          type="checkbox"
          checked={
            items.length ===
            items.filter((item) => item.status === TodoStatus.COMPLETED).length
          }
          onChange={onToggleAllTodo}
        />
        <div className="Todo__tabs">
          {LIST_TAB.map((tab) => {
            return (
              <button
                key={tab.value}
                className={`Action__btn ${showing === tab.value && "active"}`}
                onClick={() => setShowing(tab.value)}
              >
                {tab.text}
              </button>
            );
          })}
        </div>
        <button className="Action__btn clear__all" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
      <div className="ToDo__list">
        {showing === "ALL" ? (
          <RLDD
            items={items}
            itemRenderer={itemRenderer}
            onChange={handleRLDDChange}
          />
        ) : (
          items.map((item) => itemRenderer(item))
        )}
      </div>
      <Modal
        visible={visible}
        title="Edit todo"
        onClose={(e) => setVisible(false)}
      >
        <input
          className="Todo__input"
          value={inputItem}
          onKeyDown={(e) => onUpdateTodo(e, itemEdit?.todo_id || "")}
          onChange={(e) => {
            setInputItem(e.currentTarget.value);
          }}
        />
      </Modal>
    </Container>
  );
};

export default ToDoPage;
