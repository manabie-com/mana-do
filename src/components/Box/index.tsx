import { ComponentPropsWithRef } from 'react';
import styled, { css } from 'styled-components';

type BoxProps = ComponentPropsWithRef<'div'> & {
  display?: 'block' | 'inline-block' | 'flex';
  justifyContent?: 'flex-start' | 'center' | 'flex-end';
  alignItems?: 'baseline' | 'flex-start' | 'center' | 'flex-end' | 'stretch';
  padding?: string;
  margin?: string;
};

const Box = styled.div<BoxProps>`
  width: 100%;
  display: ${({ display = 'block' }) => display};
  ${({ justifyContent }) => css`
    justify-content: ${justifyContent};
  `}
  ${({ alignItems }) => css`
    align-items: ${alignItems};
  `}
  margin: 0 auto;
  padding: ${({ padding = 0 }) => padding};
  margin: ${({ margin = 0 }) => margin};
`;

export default Box;
