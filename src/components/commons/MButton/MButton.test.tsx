import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import MButton from "./MButton";

describe('Must render MButton properly', () => {
  it('must blur after being clicked', () => {
    const { container } = render(
      <MButton className='extra-class-testing'>
        Test Button
      </MButton>
    )

    expect((container.querySelector('button') as HTMLElement).classList).toContain('extra-class-testing');

    // TODO: find way to test button will fire blur event after being clicked, without using jquery
    // fireEvent.click(container.querySelector('button') as HTMLElement);

  });

  it('must fire onClickAction when being clicked, if onClickAction is passed ', () => {
    const mockOnClickAction = jest.fn();
    const { container } = render(
      <MButton onClickAction={mockOnClickAction}>
        Test Button
      </MButton>
    )
    fireEvent.click(container.querySelector('button') as HTMLElement);
    expect(mockOnClickAction).toBeCalledTimes(1);
  });
});
