import { ComponentPropsWithRef } from 'react';
import styled, { css } from 'styled-components';

type BoxPropsType = ComponentPropsWithRef<'div'> & {
  display?: 'block' | 'inline-block' | 'flex';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
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
  padding: ${({ padding = 0 }) => padding};
  margin: ${({ margin = 0 }) => margin};
`;

export default Box;
