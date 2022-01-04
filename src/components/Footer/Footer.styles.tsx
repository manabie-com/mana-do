import styled from "styled-components";

export const ToDoWrapper = styled.div`
  .footer {
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    &::before {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 50px;
      overflow: hidden;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
        0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
        0 17px 2px -6px rgba(151, 149, 149, 0.2);
    }
    &__toolbar {
      display: flex;
      justify-content: space-between;
    }

    &__tabs > *:not(:last-child) {
      margin-right: 8px;
    }
    &__btn {
    }
    &__todo-count {
      float: left;
      text-align: left;
    }
    &__tabs {
      margin: 0;
      padding: 0;
      list-style: none;
      position: absolute;
      right: 0;
      left: 0;
      li {
        display: inline;
      }
      a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
      }
    }
    &__clear-completed {
      float: right;
      position: relative;

      text-decoration: none;
      cursor: pointer;
      &:active {
        float: right;
        position: relative;
        text-decoration: none;
        cursor: pointer;
      }
    }
    .selected {
      border-color: rgba(175, 47, 47, 0.2);
    }
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
