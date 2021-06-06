import React, { ComponentPropsWithRef, FC } from 'react';
import styled from 'styled-components';
import theme from 'globalTheme';

const StyledTodoToolbar = styled.div`
  display: block;
  text-align: center;

  & > * {
    margin-top: 1rem;
  }
  @media screen and (min-width: ${theme.responsive.sm}) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const TodoToolbar: FC<ComponentPropsWithRef<'div'>> = ({ children }) => {
  return <StyledTodoToolbar>{children}</StyledTodoToolbar>;
};

export default TodoToolbar;
