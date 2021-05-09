import React from 'react';
import styled from 'styled-components';

const BaseButton = props => {
  if (props?.danger) {
    return <DangerButton {...props} />;
  }
  return <ButtonWrapper {...props} />;
};

const ButtonWrapper = styled.button`
  padding: 1rem 1.5rem;
  background-color: #1aa1f5;
  color: #fff;
  border-radius: 4rem;
  border: 0.1rem solid #1aa1f5;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1rem;
  cursor: pointer;
`;

const DangerButton = styled(ButtonWrapper)`
  background-color: red;
  border: 1px solid red;
`;

export default BaseButton;
