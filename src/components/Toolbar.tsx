import React from "react";
import { TodoStatus } from "../models/todo";
import styled from "styled-components";

const ListFilter = styled.ul`
  padding-inline-start: 0;
  margin-bottom: 15px;

  li {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
    cursor: pointer;

    button {
      font-size: 1rem;
      padding: 0.4rem 0.75rem;
      font-size: 1.4rem;
      background: transparent;
      border: 3px solid #333;
      box-shadow: 4px 4px #f50057;
      cursor: pointer;
      transform: 2s ease;
      outline: none;

      &:active {
        position: relative;
        left: 4px;
        top: 4px;
        box-shadow: none;
        text-shadow: none;
      }
      &.active {
        background: #f50057;
      }
    }
  }
`;

interface ToolbarProps {
  showing: string;
  setShowing: React.Dispatch<React.SetStateAction<TodoStatus>>;
  onDeleteAllTodo: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ showing, setShowing, onDeleteAllTodo }) => {
  return (
    <ListFilter id="list--sort">
      <li>
        <button onClick={() => setShowing(TodoStatus.ALL)} className={showing === TodoStatus.ALL ? "active" : ""}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => setShowing(TodoStatus.ACTIVE)} className={showing === TodoStatus.ACTIVE ? "active" : ""}>
          To-do
        </button>
      </li>
      <li>
        <button
          onClick={() => setShowing(TodoStatus.COMPLETED)}
          className={showing === TodoStatus.COMPLETED ? "active" : ""}
        >
          Completed
        </button>
      </li>
      <li>
        <button onClick={onDeleteAllTodo} className="nav--button">
          Clear All
        </button>
      </li>
    </ListFilter>
  );
};

export default Toolbar;
