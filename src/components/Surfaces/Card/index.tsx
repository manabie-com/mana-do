import React, { ComponentPropsWithRef, FC } from 'react';
import styled from 'styled-components';

type CardType = ComponentPropsWithRef<'div'> & {
  background?: string;
};

const StyledCard = styled.div<CardType>`
  box-shadow: 0px 2px 3px 1px rgb(0 0 0 / 20%);
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  background: ${({ background = 'none' }) => background};
`;

const Card: FC<CardType> = ({ children, ...rest }) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};

export default Card;
