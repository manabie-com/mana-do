import useRefClickOutside from './useRefClickOutside';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

const mockHandler = jest.fn();

const MockDom = () => {
  const ref = React.createRef<HTMLInputElement>();
  useRefClickOutside(ref, mockHandler);

  return (
    <div role='main' style={{ width: '100vw', height: '100vh' }}>
      <input value='This is input' ref={ref} style={{ width: '100px' }} readOnly/>
    </div>
  );
}

describe('useRefClickOutside must work properly', () => {
  it('click on outside div must trigger the handler', () => {
    render(
      <MockDom/>
    )
    fireEvent.click(screen.getByRole('main'));
    expect(mockHandler).toBeCalled();
  });
})
