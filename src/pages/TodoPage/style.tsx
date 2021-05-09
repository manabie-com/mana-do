import styled from 'styled-components';

const TodoPageWrapper = styled.div`
  height: 100vh;

  .Todo {
    &__container {
      width: 600px;
      height: 500px;
      border: 1px solid #80808040;
      display: grid;
      grid-template-columns: 4fr;
      grid-template-rows: min-content 4fr min-content;
      background: white;
      border-radius: 10px;
      box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.09),
        3px 2px 3px rgba(0, 0, 0, 0.05);
    }
    &__creation {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0px;
      input {
        outline: none;
        width: 65%;
        height: 35px;
        border-radius: 10px;
        border: 1px solid gray;
        padding-left: 10px;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        :focus {
          width: 80%;
        }
      }
    }

    &__list {
      padding: 2rem 4rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      overflow-y: auto;
      .checkall {
        align-self: flex-start;
        margin-left: 30px;
        margin-bottom: 10px;
      }
    }

    &__item {
      padding: 10px 0px;
      width: 90%;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:not(:last-child) {
        border-bottom: 1px solid gray;
      }
      input {
        flex-basis: 5%;
      }
      span {
        flex-grow: 1;
        font-size: 16px;
      }
      button {
        background: red;
        border: 0;
        width: 25px;
        height: 25px;
        cursor: pointer;
        border-radius: 5px;
        color: whitesmoke;
        transition: all 0.3s;
        :hover {
          transform: scale(1.1);
        }
      }
      form {
        width: 95%;
        height: 30px;
      }
      form > input {
        width: 100%;
        height: 100%;
        padding-left: 20px;
        border-radius: 5px;
        border: 1px solid gray;
      }
    }

    &__toolbar {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 20px 0px;
    }
  }

  .btn__logout {
    margin-bottom: 10px;
  }
`;

export default TodoPageWrapper;
