import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .Login__inner {
    width: 350px;
    margin: 24px auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 48px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.1);
    background: var(--listbg);
    padding: 20px;
    text-align: left;
    color: var(--font-color);

    .Login__row {
      margin: 0 0 24px;
    }

    input {
      width: 100%;
      padding: 18px;
      background: transparent;
      border-radius: 4px;
      border: 1px solid var(--darkgrayishblue);
      flex: 1 0 auto;
      color: var(--font-color);
      font-size: 14px;
      font-family: inherit;

      :focus,
      :active {
        outline: none;
      }
    }

    button {
      width: 100%;
      min-height: 32px;
      min-width: 80px;
      padding: 4px 8px;
      cursor: pointer;
      display: inline-block;
      outline: 0;
      border: none;
      background: #e0e1e2 none;
      color: rgba(0, 0, 0, 0.6);
      margin: 0 4px 0 0;
      text-transform: none;
      text-shadow: none;
      font-weight: 700;
      line-height: 32px;
      font-style: normal;
      text-align: center;
      text-decoration: none;
      border-radius: 4px;
      background: var(--brightblue);
      box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
      color: white;
    }
  }
`;
