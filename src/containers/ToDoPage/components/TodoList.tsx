import React from 'react';
import styled from 'styled-components';

import { TodoItem } from './TodoItem';
import { EntityId } from '@reduxjs/toolkit';

interface Props {
  ids: EntityId[];
}

export function TodoList(props: Props) {
  const { ids } = props;

  const count = ids.length;
  return (
    <Wrapper>
      {count <= 0 ? (
        <div>Nothing to show</div>
      ) : (
        ids.map(id => <TodoItem key={id} id={id} />)
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 24px 0;
`;
