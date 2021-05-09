import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useIsFetching } from 'react-query';
import { isLoadingSelector } from 'store/modules/app/selector';

const Loading = () => {
  const isLoading = useSelector(isLoadingSelector);
  const isFetching = useIsFetching('todos');

  return (
    (isLoading || isFetching > 0) && (
      <LoadingWrapper className='loading-component'>
        <ReactLoading type='spin' color='#fff' />
      </LoadingWrapper>
    )
  );
};

const LoadingWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: gray;
  opacity: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
