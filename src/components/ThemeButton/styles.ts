import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;

  .toggle {
    --size: 2rem;

    appearance: none;
    outline: none;
    cursor: pointer;

    width: var(--size);
    height: var(--size);
    box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
    border-radius: 999px;
    color: hsl(235, 24%, 19%);

    transition: all 500ms;

    &:checked {
      --ray-size: calc(var(--size) * -0.4);
      --offset-orthogonal: calc(var(--size) * 0.65);
      --offset-diagonal: calc(var(--size) * 0.45);

      transform: scale(0.75);
      color: hsl(40, 100%, 50%);
      box-shadow: inset 0 0 0 var(--size), calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
        var(--offset-orthogonal) 0 0 var(--ray-size), 0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
        0 var(--offset-orthogonal) 0 var(--ray-size),
        calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
        var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
        calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
        var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);
    }
  }

  .toggle {
    & ~ .title {
      --color: hsl(235, 24%, 19%);
    }

    z-index: 1;
    &:checked {
      & ~ .background {
        --bg: white;
      }
      & ~ .title {
        --color: hsl(40, 100%, 50%);
      }
    }
  }

  .title {
    margin-left: 8px;
    --color: hsl(240, 100%, 95%);
    color: var(--color);
    z-index: 1;
    cursor: pointer;
    display: block;
    padding: 0.5rem 0 0;
    transition: color 500ms;
  }
`;