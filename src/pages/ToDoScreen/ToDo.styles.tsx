import styled from "styled-components";

export const ToDoWrapper = styled.div`
  margin: 130px auto;
  h1 {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
  }
  .title {
    display: flex;
    justify-content: center;
  }
  .ToDo__container {
    width: 500px;
    background: #fff;

    position: relative;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
  }

  .Todo__creation {
    display: flex;
  }

  .Todo__input {
    flex: 1 1;
    padding: 16px 16px 16px 60px;

    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    /* border: 0; */
    color: inherit;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgb(0 0 0 / 3%);

    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .ToDo__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .ToDo__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ToDo__item > span {
    flex: 1 1;
    text-align: left;
    margin-left: 8px;
  }

  .Todo__content {
    flex: 1 1;
  }

  .Todo__delete {
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

  .Todo__action,
  .Todo__delete {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  .Todo__toggle-all {
    text-align: center;
    border: none;
    opacity: 0;
    position: absolute;
    & + label {
      width: 60px;
      height: 34px;
      font-size: 0;
      position: absolute;
      top: 15px;
      left: -13px;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
      &::before {
        content: "❯";
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
      }
    }
    &:checked {
      & + label::before {
        color: #737373;
      }
    }
  }
`;
