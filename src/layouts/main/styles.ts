import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;

  section {
    display: flex;
    height: 100%;
    overflow-x: hidden;
  }

  .header {
    width: 100%;
    height: 55px;
    background: var(--listbg);
    padding: 0 12px;

    > .nav-inner {
      display: flex;
      justify-content: space-between;
      margin-right: auto;
      max-width: 1200px;
      margin-left: auto;
      width: 100%;
      height: 100%;
      align-items: center;
    }

    button {
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
      border-radius: 2px;

      &.basic {
        background: transparent;
        box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
      }

      &.green {
        box-shadow: 0 0 0 1px var(--green-color) inset !important;
        color: var(--green-color) !important;
      }

      &.blue {
        box-shadow: 0 0 0 1px var(--blue-color) inset !important;
        color: var(--blue-color) !important;
      }

      &.red {
        box-shadow: 0 0 0 1px #db2828 inset !important;
        color: #db2828 !important;
      }
    }
  }
`;
