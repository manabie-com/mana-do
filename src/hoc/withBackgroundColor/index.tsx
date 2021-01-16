import React from 'react';
import Box from '../../components/Layouts/Box';
import { colorPalete } from '../../utils/colors.utils';

const withBackgroundColor = (WrappedComponent: React.FC, name?: string): () => JSX.Element => {
  return (): JSX.Element => {
    return (
      <div style={{ backgroundColor: colorPalete.background }}>
        <Box m={10}>
          <h1 style={{ color: colorPalete.onSurface }}>{name} Page</h1>
        </Box>
        <WrappedComponent />
      </div>
    );
  };
};

export default withBackgroundColor;