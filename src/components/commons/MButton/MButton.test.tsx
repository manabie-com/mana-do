import React from 'react';
import { render } from '@testing-library/react';
import MButton from "./MButton";

describe('Must render MButton properly', function () {
  it('After being clicked, must blur this button', () => {
    const { container } = render(
      <MButton btnExtraClassName='extra-class-testing'>
        Test Button
      </MButton>
    )

    expect((container.querySelector('button') as HTMLElement).classList).toContain('extra-class-testing');

    // TODO: find way to test button will fire blur event after being clicked, without using jquery
    // fireEvent.click(container.querySelector('button') as HTMLElement);

  });
});
