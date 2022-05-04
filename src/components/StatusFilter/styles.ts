import styled from "styled-components";

export const Wrapper = styled.div`
  .select-btn {
    display: inline-block;
    color: var(--font-color);
    background-color: var(--listbg);
    text-transform: capitalize;
    margin-right: 1rem;
    align-items: center;
    justify-self: flex-end;
    border-color: transparent;
    font-size: 0.85rem;
    font-family: inherit;
    font-weight: 400;
    letter-spacing: var(--spacing);
    cursor: pointer;
    margin-top: 0;

    :hover {
      color: var(--softbg);
    }

    :focus,
    :active {
      outline: none;
    }
  }

  .active-all,
  .active-active,
  .active-completed {
    color: var(--brightblue) !important;
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    .active-all,
    .active-active,
    .active-completed {
      color: var(--brightblue) !important;
      font-weight: 700;
    }
  }
`;
