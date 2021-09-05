import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.colors.white};
  outline: none;
  border: none;
  border-radius: 8px;
  min-height: 32px;
  min-width: 80px;
  padding: 4px 8px;
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.normal};
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.primary.dark[1]};
  }
  &:focus {
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: rgba(235, 241, 249, 1) 0 0 0 3px;
  }
`;
