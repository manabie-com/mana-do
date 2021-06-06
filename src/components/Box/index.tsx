import { ComponentPropsWithRef } from 'react';
import styled, { css } from 'styled-components';

type BoxPropsType = ComponentPropsWithRef<'div'> & {
  display?: 'block' | 'inline-block' | 'flex';
  justifyContent?: 'flex-start' | 'center' | 'flex-end';
  alignItems?: 'baseline' | 'flex-start' | 'center' | 'flex-end' | 'stretch';
  textAlign?: 'left' | 'center' | 'right';
  padding?: string;
  margin?: string;
};

const Box = styled.div<BoxPropsType>`
  width: 100%;
  display: ${({ display = 'block' }) => display};
  ${({ justifyContent }) => css`
    justify-content: ${justifyContent};
  `}
  ${({ alignItems }) => css`
    align-items: ${alignItems};
  `}
  ${({ textAlign }) => css`
    text-align: ${textAlign};
  `}
  margin: 0 auto;
  padding: ${({ padding = 0 }) => padding};
  margin: ${({ margin = 0 }) => margin};
`;

export default Box;
