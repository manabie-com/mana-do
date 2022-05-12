import styled from 'styled-components';

export const TodoContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  margin: 5rem 10px 0;
  padding: 24px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.09), 3px 2px 3px rgba(0, 0, 0, 0.05);
`;

export const TodoCreation = styled.div`
  display: flex;
`;

export const TodoToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 24px;
`;

export const TodoTabs = styled.div`
  display: flex;
  flex-flow: column nowrap;

  > button:not(:last-child) {
    margin-bottom: 8px;
  }
  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
    justify-content: center;

    > button:not(:last-child) {
      margin-right: 8px;
      margin-bottom: 0;
    }
  }
`;
