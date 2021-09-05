import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  display: flex;
`;

export const InputLabel = styled.label`
  color: ${(props) => props.theme.colors.gray[7]};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: ${(props) => props.theme.fontWeight.semi};
  padding-left: 8px;
  text-align: left;
`;
export const LabelRequired = styled.span`
  color: ${(props) => props.theme.colors.red[8]};
`;
export const Input = styled.input`
  background: white;
  border-radius: 8px;
  border: ${(props) => props.theme.colors.gray[2]} 1px solid;
  transition: all 200ms ease-in-out;
  min-height: 36px;
  outline: none;
  padding: 0 8px;
  font-size: ${(props) => props.theme.fontSize.normal};
  color: ${(props) => props.theme.colors.primary.dark[3]};
  margin: 4px 0;
  width: 100%;
  &:hover {
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: rgba(235, 241, 249, 1) 0 0 0 3px;
  }
  &:focus {
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: rgba(235, 241, 249, 1) 0 0 0 3px;
  }
`;

export const InputEndAdornment = styled.div`
  position: absolute;
  right: 8px;
  top: 30%;
  color: ${(props) => props.theme.colors.blue[3]};
  cursor: pointer;
`;
