import React, { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';
// import theme from 'globalTheme';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  height: 100vh;
  margin: 0 auto;
  & > * {
    margin-top: 1.2rem;
  }
`;

const Form = ({ children, ...rest }: ComponentPropsWithRef<'form'>) => (
  <StyledForm data-testid="form" {...rest}>
    {children}
  </StyledForm>
);

export default Form;
