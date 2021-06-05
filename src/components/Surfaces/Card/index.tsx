import React, { FC } from 'react';
import styled from 'styled-components';

type CardType = {
  children: React.ReactNode;
};

const StyledCard = styled.div`
  box-shadow: 0px 2px 3px 1px rgb(0 0 0 / 20%);
  border-radius: 4px;
  padding: 2rem;
`;

const Card: FC<CardType> = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
