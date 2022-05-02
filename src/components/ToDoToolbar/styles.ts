import styled from "styled-components";

export const Toolbar = styled.div`
   display: flex;
   justify-content: space-between;
   margin-top: 24px;
`;

export const ToolbarTabs = styled.div`
   display: flex;
   justify-content: center;

   & > *:not(:last-child) {
      margin-right: 8px;
   }
`;

export const ActionButton = styled.button``;

export const StyledInput = styled.input``;
