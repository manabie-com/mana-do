import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MCheckbox from './MCheckbox';

describe('Must render MCheckbox properly', () => {
  it('must fire the passed "onChange" action when being clicked', () => {
    const mockOnChangeAction = jest.fn();
    const { container } = render(
      <MCheckbox checked={true} onChange={(checked) => mockOnChangeAction(checked)}/>
    )
    fireEvent.click(container.querySelector('input[type="checkbox"]') as HTMLElement);
    expect(mockOnChangeAction).toBeCalledWith(false);
  });
});
