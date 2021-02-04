import styled, { css } from 'styled-components';

const defaultColor = css`
  background-color: #e0e1e2;
  color: rgba(0, 0, 0, 0.6);

  &:hover,
  &:focus {
    background-color: #cacbcd;
    color: rgba(0, 0, 0, 0.8);
  }

  &:active {
    background-color: #babbbc;
    color: rgba(0, 0, 0, 0.9);
  }
`;

const primaryColor = css`
  background-color: #2185d0;
  color: #fff;

  &:hover,
  &:focus {
    background-color: #1678c2;
  }

  &:active {
    background-color: #1a69a4;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  outline: none;
  cursor: pointer;
  border: none;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 6px;
  ${({ primary = false }) => (primary ? primaryColor : defaultColor)};
`;
