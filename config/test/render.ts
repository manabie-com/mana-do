import { render } from '@testing-library/react';

export const renderComponent = (renderFunction = render) => {
  return (component: JSX.Element, ...args: any) => {
    return renderFunction(component, ...args);
  };
};
