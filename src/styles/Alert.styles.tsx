import styled from "styled-components";

export const Alert = styled.div`
  background: ${(props) => props.theme.palette.error.main};
  color: ${(props) => props.theme.palette.error.dark};
  padding: 6px 16px;
  display: flex;
  font-weight: 400;
  border-radius: 4px;
  align-items: center;
`;