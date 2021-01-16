import React from 'react';
import Box from '../../components/Layouts/Box';
import Center from '../../components/Layouts/Center';
import { colorPalete } from '../../utils/colors.utils';

const withPageName = (WrappedComponent: React.FC, name?: string): () => JSX.Element => {
  return (): JSX.Element => {
    return (
      <div >
        <Box m={6}>
          <Center>
            <h1 style={{ color: colorPalete.onSurface }}>{name} Page</h1>
          </Center>
        </Box>
        <WrappedComponent />
      </div>
    );
  };
};

export default withPageName;