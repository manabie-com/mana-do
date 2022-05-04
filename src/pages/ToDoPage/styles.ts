import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;

  .title {
    color: var(--font-color);
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    margin-top: 40px;
  }

  .list-container {
    margin: 0 auto;
    width: 540px;
    padding: 50px 0;

    .input-wrap {
      background: var(--clr-white);
      border-radius: var(--radius);
      box-shadow: var(--light-shadow);
      transition: var(--transition);
      margin: auto;

      .form-control {
        display: flex;
        justify-content: center;
        height: 65px;
        margin-bottom: 25px;

        input {
          padding: 24px;
          background: var(--listbg);
          border-radius: 5px;
          border-color: transparent;
          flex: 1 0 auto;
          color: var(--font-color);
          font-size: 14px;
          font-family: inherit;

          :focus,
          :active {
            outline: none;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .title {
      font-size: 30px;
      margin-top: 24px;
    }

    .list-container {
      width: 100%;
      padding: 24px 0;
    }
  }
`;
