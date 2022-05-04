import styled from "styled-components";
import { TODO_ITEM_HEIGHT } from "../../../utils/constants";

export const ListItemWrapper = styled.article`
  display: flex;
  width: 100%;
  min-height: ${TODO_ITEM_HEIGHT}px;
  padding: 12px 16px;
  color: var(--font-color);
  background-color: var(--listbg);
  vertical-align: middle;
  border-bottom: 1px solid var(--softbg);

  :first-of-type {
    border-radius: 5px 5px 0px 0px;
  }

  .title {
    width: 5000px;
    margin-bottom: 0;
    color: var(--font-color);
    transition: var(--transition);
    text-decoration: none;
    align-self: center;
    overflow: hidden;
    height: 20px;
    text-align: left;
  }

  .title-completed {
    width: 5000px;
    margin-bottom: 0;
    color: var(--font-color);
    transition: var(--transition);
    text-decoration: line-through;
    align-self: center;
    height: 20px;
    vertical-align: middle;
    overflow: hidden;
  }

  .completed-btn,
  .uncompleted-btn {
    width: 20px;
    align-items: center;
    cursor: pointer;
    transition: var(--transition);
    border-radius: 50%;
    margin-right: 1rem;
    height: 20px;
    vertical-align: middle;
  }

  .uncompleted-btn {
    border: 2px solid var(--softbg);
    background: none;
  }

  .completed-btn {
    border: none;
    background-size: cover;
    background: url(./assets/icons/icon-check.svg) no-repeat, linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
    background-position-x: center;
    background-position-y: center;
  }

  .completed-btn:hover,
  .uncompleted-btn:hover {
    border-color: var(--font-color);
  }

  .completed-btn:focus,
  .uncompleted-btn:focus,
  .completed-btn:active,
  .uncompleted-btn:active {
    outline: none;
  }

  .delete {
    display: flex;
    justify-content: flex-end;
    align-self: center;
    margin-left: 14px;
  }

  .delete-btn {
    color: var(--softbg);
    align-items: center;
    cursor: pointer;
    border: none;
    font-size: 20px;
    background: none;
    height: 15px;
    vertical-align: middle;

    :focus {
      outline: none;
    }

    svg {
      transition: transform 0.25s, opacity 0.25s;
      opacity: 0.5;

      path {
        fill: var(--font-color);
      }
    }

    :hover {
      svg {
        transform: rotate(270deg);
        opacity: 1;

        path {
          fill: red;
        }
      }
    }
  }

  .btn-cont {
    align-self: center;
  }

  .text_and_checkbox {
    --text: #414856;
    --check: var(--brightblue);
    --disabled: #c3c8de;
    --border-radius: 10px;
    border-radius: var(--border-radius);
    box-shadow: 0 10px 30px rgba(#414856, 0.05);
    display: grid;
    grid-template-columns: 30px auto;
    align-items: center;
    width: 100%;

    label {
      color: var(--font-color);
      position: relative;
      cursor: pointer;
      display: grid;
      align-items: center;
      width: fit-content;
      transition: color 0.3s ease;
      &::before,
      &::after {
        content: "";
        position: absolute;
      }
      &::before {
        height: 2px;
        width: 8px;
        left: -27px;
        background: var(--check);
        border-radius: 2px;
        transition: background 0.3s ease;
      }
      &:after {
        height: 4px;
        width: 4px;
        top: 8px;
        left: -25px;
        border-radius: 50%;
      }
    }

    .input_live_edit {
      width: 100%;
      height: 24px;
      transition: none;
      border: none;
      outline: none;

      :focus,
      :hover {
        border: none;
      }
    }

    input[type="checkbox"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      height: 15px;
      width: 15px;
      outline: none;
      border: 0;
      margin: 0 15px 0 0;
      cursor: pointer;
      display: grid;
      align-items: center;
      &::before,
      &::after {
        content: "";
        position: absolute;
        height: 2px;
        top: auto;
        background: var(--check);
        border-radius: 2px;
      }
      &::before {
        width: 0px;
        right: 60%;
        transform-origin: right bottom;
      }
      &::after {
        width: 0px;
        left: 40%;
        transform-origin: left bottom;
      }
      &:checked {
        &::before {
          animation: check-01 0.4s ease forwards;
        }
        &::after {
          animation: check-02 0.4s ease forwards;
        }
        + label {
          color: var(--disabled);
          animation: move 0.3s ease 0.1s forwards;
          &::before {
            background: var(--disabled);
            animation: slice 0.4s ease forwards;
          }
          &::after {
            animation: firework 0.5s ease forwards 0.1s;
          }
        }
      }
    }
  }

  @keyframes move {
    50% {
      padding-left: 8px;
      padding-right: 0px;
    }
    100% {
      padding-right: 4px;
    }
  }
  @keyframes slice {
    60% {
      width: 100%;
      left: 4px;
    }
    100% {
      width: 100%;
      left: -2px;
      padding-left: 0;
    }
  }
  @keyframes check-01 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(45deg);
    }
    100% {
      width: 5px;
      top: 8px;
      transform: rotate(45deg);
    }
  }
  @keyframes check-02 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(-45deg);
    }
    100% {
      width: 10px;
      top: 8px;
      transform: rotate(-45deg);
    }
  }
  @keyframes firework {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0,
        0 0 0 -2px #4f29f0;
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      box-shadow: 0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0, 14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0,
        -14px 8px 0 0px #4f29f0, -14px -8px 0 0px #4f29f0;
    }
  }
`;
