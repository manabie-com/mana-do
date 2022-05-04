import styled from "styled-components";

export const Wrapper = styled.div`
  .button-container {
    width: 100%;
    height: 55px;
    background-color: var(--listbg);
    border-color: var(--font-color);
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    border-radius: 0px 0px 5px 5px;

    .items-left {
      display: flex;
      align-items: center;
      padding-left: 16px;
      color: var(--softbg);
      width: 117px;

      input {
        margin-bottom: 6px;
        margin-right: 8px;
        cursor: pointer;
      }
    }

    .clear-completed-btn {
      color: var(--font-color);
      background-color: var(--listbg);
      text-transform: capitalize;
      justify-self: flex-end;
      border-color: transparent;
      font-size: 0.85rem;
      font-family: inherit;
      font-weight: 400;
      letter-spacing: var(--spacing);
      cursor: pointer;
      margin-top: 0;
      text-align: right;
      padding-right: 16px;

      :hover {
        color: var(--brightblue);
      }

      :focus {
        outline: none;
      }
    }
  }

  .mobile-button-container {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .mobile-button-container {
      display: flex;
      background-color: var(--listbg);
      margin-top: 16px;
      height: 48px;
      border-radius: 5px;
      justify-content: center;
      align-items: center;
    }

    .button-container {
      .select-btn {
        display: none;
      }
    }
  }
`;
