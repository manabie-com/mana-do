import styled from 'styled-components';

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   margin-top: 1.5rem;
`;

export const Item = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const StyledSpan = styled.span`
   flex: 1 1;
   text-align: left;
   margin-left: 8px;
   width: 85%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   &.completed {
     text-decoration: line-through;
   }
`;

export const StyledButton = styled.button`
   outline: none;
   border: none;
   width: 32px;
   height: 32px;
   min-width: auto;
   min-height: auto;
   box-shadow: none;
   border-radius: 50%;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
`;

export const StyledInput = styled.input``;

export const InlineEditContainer = styled.div`
  width: 87%;

  & input {
    width: 87%;
  }
`;

export const StyledImage = styled.img``;
