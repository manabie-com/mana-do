import styled from "styled-components";
import { TodoStatus } from "models/todo";
interface Props {
  readonly status: TodoStatus;
}

export const ToDoWrapper = styled.div<Props>`
  .Todo {
    /* display: flex;
    align-items: center;
    justify-content: space-between; */

    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    &:hover {
      .Todo__destroy {
        display: block;
      }
    }

    button {
      padding: 0;
      border: 0;
      background: none;
      font-size: 100%;
      vertical-align: baseline;
      font-family: inherit;
      font-weight: inherit;

      -webkit-appearance: none;
      appearance: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    span {
      flex: 1 1;
      text-align: left;
      margin-left: 8px;
    }

    label {
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center left;
      word-break: break-all;
      padding: 15px 15px 15px 60px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
      color: ${(props) =>
        props.status === TodoStatus.ACTIVE ? "#030000" : "#d9d9d9"};
      text-decoration: ${(props) =>
        props.status === TodoStatus.ACTIVE ? "none" : "line-through"};
    }

    input[type="checkbox" i] {
      background-color: initial;
      cursor: default;
      -webkit-appearance: checkbox;
      box-sizing: border-box;
      margin: 3px 3px 3px 4px;
      padding: initial;
      border: initial;
    }
    &__destroy {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      bottom: 0;
      width: 40px;
      height: 40px;
      margin: auto 0;
      font-size: 30px;
      color: #cc9a9a;
      margin-bottom: 11px;
      transition: color 0.2s ease-out;
      &::after {
        content: "×";
      }
    }
    &__content {
      flex: 1 1;
    }
    &__delete {
      outline: none;
      border: none;
      width: 32px;
      height: 32px;
      min-width: auto;
      min-height: auto;
      box-shadow: none;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    &__action,
    &__delete {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    &__toggle {
      height: 40% !important;
      background: none;
      opacity: 0;
      text-align: center;
      width: 40px;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto 0 !important;
      border: none;
      -webkit-appearance: none;
      appearance: none;
      &:checked + label {
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
      }
    }
    &__edit {
      position: relative;
      margin: 0;
      width: 100%;
      font-size: 24px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      border: 0;
      color: inherit;
      padding: 6px;
      border: 1px solid #999;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
`;
